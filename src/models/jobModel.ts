import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    cleaningType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    town: {
      type: String,
      required: true,
    },

    m2: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// delete old model
if (mongoose.models.jobs) {
  const jobModel = mongoose.model('jobs')
  mongoose.deleteModel(jobModel.modelName)
}

// create new model
const Job = mongoose.model('jobs', jobSchema)
export default Job
