const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// 🔥 Notify Admins when a file is uploaded
exports.notifyAdminsOnUpload = functions.firestore
  .document("pendingUploads/{uploadId}")
  .onCreate(async (snapshot, context) => {
    const uploadData = snapshot.data();

    try {
      // Fetch all admin users
      const adminsSnapshot = await admin.firestore()
        .collection("users")
        .where("role", "==", "admin")
        .get();
      
      const batch = admin.firestore().batch();

      adminsSnapshot.forEach(adminDoc => {
        const adminId = adminDoc.id;
        const notificationRef = admin.firestore().collection("notifications").doc();

        batch.set(notificationRef, {
          userId: adminId,
          type: "PENDING_UPLOAD",
          title: "New Content Requires Review",
          message: `File "${uploadData.title}" uploaded by a user requires your approval.`,
          resourceId: context.params.uploadId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          read: false
        });
      });

      await batch.commit();
      console.log("✅ Admins notified about pending upload.");
      return null;
    } catch (error) {
      console.error("❌ Error sending admin notifications:", error);
      return null;
    }
  });

// 🔥 Notify User when their upload is Approved/Rejected
exports.notifyUserOnReview = functions.firestore
  .document("pendingUploads/{uploadId}")
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    if (beforeData.status === "pending" && afterData.status !== "pending") {
      try {
        const userId = afterData.uploadedBy;
        const notificationRef = admin.firestore().collection("notifications").doc();

        if (afterData.status === "approved") {
          await notificationRef.set({
            userId: userId,
            type: "UPLOAD_APPROVED",
            title: "Your Upload is Approved 🎉",
            message: `Your file "${afterData.title}" has been approved and is now live.`,
            resourceId: context.params.uploadId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            read: false
          });
        } else if (afterData.status === "rejected") {
          await notificationRef.set({
            userId: userId,
            type: "UPLOAD_REJECTED",
            title: "Upload Rejected ❌",
            message: `Your file "${afterData.title}" was rejected. Reason: ${afterData.notes || "No reason provided."}`,
            resourceId: context.params.uploadId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            read: false
          });
        }

        console.log("✅ User notified about review.");
        return null;
      } catch (error) {
        console.error("❌ Error sending user notification:", error);
        return null;
      }
    }

    return null;
  });
