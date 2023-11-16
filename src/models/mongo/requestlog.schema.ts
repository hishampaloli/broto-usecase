import mongoose from 'mongoose';
import { RequestLogAttrs } from '../../types/types';

interface RequestLogDoc extends mongoose.Document {
  method: string;
  path: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

interface RequestLogModel extends mongoose.Model<RequestLogDoc> {
  build(attrs: RequestLogAttrs): RequestLogDoc;
}

const requestLogSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    capped: {
      size: 100 * 1024,
      max: 100,
      autoIndexId: true,
    },
  }
);

requestLogSchema.set('versionKey', 'version');

requestLogSchema.statics.build = (attrs: RequestLogAttrs) => {
  return new RequestLog(attrs);
};

const RequestLog = mongoose.model<RequestLogDoc, RequestLogModel>(
  'RequestLog',
  requestLogSchema
);

export { RequestLog, RequestLogDoc, RequestLogAttrs };
