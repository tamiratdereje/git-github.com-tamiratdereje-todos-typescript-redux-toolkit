

const mongoose = require('mongoose');



const TodosSchema = new mongoose.Schema({
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Shopping', 'Others'],
      default: "Others",
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: "Medium",
    },
    dueData: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
  
  });

  

module.exports = mongoose.model('Todos', TodosSchema);
