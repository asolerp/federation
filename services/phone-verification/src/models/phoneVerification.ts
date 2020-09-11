import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'


interface PhoneVerificationDoc extends mongoose.Document {
  user: string,
  code: string,
  phone: string,
  verified: boolean,
}

interface PhoneVerificationDocAttrs {
  user: string,
  code: string,
  phone: string,
  verified: boolean,
}

interface PhoneVerificationModel extends mongoose.Model<PhoneVerificationDoc> {
  build(attrs: PhoneVerificationDocAttrs): PhoneVerificationDoc
}

const phoneVerificationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false,
      default: false
    },
    verified: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret._v
      }
    }
  }
)

phoneVerificationSchema.set('versionKey', 'version')
phoneVerificationSchema.plugin(updateIfCurrentPlugin)

phoneVerificationSchema.statics.build = (attrs: PhoneVerificationDocAttrs) => {
  return new PhoneVerification(attrs)
}

const PhoneVerification = mongoose.model<PhoneVerificationDoc, PhoneVerificationModel>('PhoneVerificator', phoneVerificationSchema)

export { PhoneVerification }