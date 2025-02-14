import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
      },
      fieldData: {
        type: Object,
        required: true,
      },
      cmsLocaleId: {
        type: String,
        required: true,
      },
        lastPublished: {
          type: String,
        },
        lastUpdated: {
          type: String,
        },
        createdOn: {
          type: String,
        },
        isArchived: {
          type: Boolean,
        },
        isDraft: {
          type: Boolean,
        },
}, { timestamps: true });

const Properties = mongoose.models.props || mongoose.model('props', propertySchema);
export default Properties;
  