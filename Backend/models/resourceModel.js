import mongoose from 'mongoose';

// Schema for related resources
const relatedResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }
}, { _id: false });

const resourceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    branch: {
        type: String,
        required: [true, 'Please specify the branch'],
        enum: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'EXTC', 'Electrical', 'Production']
    },
    year: {
        type: String,
        required: [true, 'Please specify the year'],
        enum: ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
    },
    type: {
        type: String,
        required: [true, 'Please specify the resource type'],
        enum: ['Notes', 'PYQS', 'Books', 'Projects']
    },
    // Enhanced fields from File model
    semester: {
        type: String,
        enum: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8']
    },
    subject: {
        type: String
    },
    courseCode: {
        type: String
    },
    // Academic fields
    professor: {
        type: String
    },
    academicYear: {
        type: String
    },
    examType: {
        type: String,
        enum: ['Mid-Term', 'End-Term', 'Quiz', 'Assignment', 'Project', 'Lab', 'Other']
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    fileUrl: {
        type: String,
        required: [true, 'Please add a file URL']
    },
    tags: [{
        type: String
    }],
    keywords: [{
        type: String
    }],
    downloads: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    // Related resources section
    relatedResources: {
        lectures: [relatedResourceSchema],
        pyqs: [relatedResourceSchema],
        books: [relatedResourceSchema],
        projects: [relatedResourceSchema]
    },
    // Rating system
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    averageRating: {
        type: Number,
        default: 0
    },
    // Verification status
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Create indexes for search
resourceSchema.index({ 
    title: 'text', 
    description: 'text', 
    tags: 'text', 
    subject: 'text',
    courseCode: 'text',
    keywords: 'text'
}, {
    weights: {
        title: 10,
        subject: 8,
        courseCode: 7,
        tags: 5,
        keywords: 5,
        description: 3
    }
});
resourceSchema.index({ branch: 1, year: 1, type: 1, semester: 1, subject: 1 });
resourceSchema.index({ downloads: -1 }); // For popular resources
resourceSchema.index({ createdAt: -1 }); // For newest resources
resourceSchema.index({ averageRating: -1 }); // For top-rated resources

// Add a pre-save middleware to handle tags
resourceSchema.pre('save', function(next) {
    // Convert title and description words to tags if no tags are provided
    if (!this.tags || this.tags.length === 0) {
        const words = [...this.title.split(' '), ...this.description.split(' ')]
            .map(word => word.toLowerCase())
            .filter(word => word.length > 3); // Only words longer than 3 characters
        this.tags = [...new Set(words)]; // Remove duplicates
    }

    // Generate keywords from various fields
    if (!this.keywords || this.keywords.length === 0) {
        const keywordSources = [
            this.title,
            this.subject,
            this.courseCode,
            this.professor,
            ...(this.tags || [])
        ].filter(Boolean);

        const allKeywords = keywordSources.join(' ').split(/\s+/)
            .map(word => word.toLowerCase())
            .filter(word => word.length > 2);
            
        this.keywords = [...new Set(allKeywords)];
    }

    // Calculate average rating if ratings exist
    if (this.ratings && this.ratings.length > 0) {
        const totalRating = this.ratings.reduce((sum, rating) => sum + rating.value, 0);
        this.averageRating = totalRating / this.ratings.length;
    }

    next();
});

// Virtual for resource URL
resourceSchema.virtual('resourceUrl').get(function() {
    return `/resource/${this._id}`;
});

const Resource = mongoose.model('Resource', resourceSchema);

// Ensure indexes are created
Resource.createIndexes().then(() => {
    console.log('Resource indexes created successfully');
}).catch(err => {
    console.error('Error creating resource indexes:', err);
});

export default Resource; 