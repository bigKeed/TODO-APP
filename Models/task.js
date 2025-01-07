const mongoose = require ('mongoose')

const taskSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'todoUser ' },
    title : {type: String, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user ' },
    status:{ type: String, enum: ['PENDING','IN PROGRESS','COMPLETED'],Default: 'PENDING'},
    description: { type: String, required: true},
    created_at:{type: Date, default: Date.now}
  
}); 

module.exports = mongoose.model ('Task', taskSchema);