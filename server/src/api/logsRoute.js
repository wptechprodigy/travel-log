const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();

    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdLog = await logEntry.save();

    res.status(200).json(createdLog);
  } catch (error) {
    next(error);
  }
});

router.patch('/:entryId', async (req, res, next) => {
  const { entryId } = req.params;

  console.log(entryId);

  try {
    const entry = await LogEntry.findByIdAndUpdate({ _id: entryId }, req.body, {
      new: true,
    });

    res.status(200).json(entry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
