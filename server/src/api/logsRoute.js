const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();

    res.status(200).json({ data: entries });
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
    if (error.name === 'ValidationError') {
      res.status(422);
    }

    next(error);
  }
});

router.get('/:entryId', async (req, res, next) => {
  const { entryId } = req.params;
  try {
    const entry = await LogEntry.findById({ _id: entryId });

    res.status(200).json(entry);
  } catch (error) {
    next(error);
  }
});

router.patch('/:entryId', async (req, res, next) => {
  const { entryId } = req.params;

  try {
    const entry = await LogEntry.findByIdAndUpdate({ _id: entryId }, req.body, {
      new: true,
    });

    res.status(200).json(entry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }

    next(error);
  }
});

router.delete('/:entryId', async (req, res, next) => {
  const { entryId } = req.params;

  try {
    const entry = await LogEntry.findOneAndRemove({ _id: entryId }).exec();

    res.status(200).json(entry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }

    next(error);
  }
});

module.exports = router;
