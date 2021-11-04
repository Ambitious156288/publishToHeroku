import Note from "../models/note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.id });
    res.json(notes);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const newNote = new Note({
      title,
      content,
      date,
      user_id: req.user.id,
      name: req.user.name,
    });
    await newNote.save();
    res.json({ msg: "Created a Note" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        content,
        date,
      }
    );
    res.json({ msg: "Updated a Note" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a Note" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
