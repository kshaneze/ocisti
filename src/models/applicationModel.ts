import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs',
    },
    status: {
      type: String,
      enum: ['Na čekanju', 'Prihvaćeni', 'Odbijeni'],
    },
  },
  { timestamps: true }
)

// delete old model
if (mongoose.models.applications) {
  const applicationModel = mongoose.model('applications')
  mongoose.deleteModel(applicationModel.modelName)
}

// create new model
const Application = mongoose.model('applications', applicationSchema)
export default Application
