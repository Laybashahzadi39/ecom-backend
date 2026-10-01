import Visit from "../models/Visit.js";

const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA");
};

// visit ginna, koi login zaroori nahi
const recordVisit = async (req, res) => {
  try {
    const today = getTodayDate();

    await Visit.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    res.status(200).json({ message: "Visit recorded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// visit ke numbers admin ko dikhana
const getVisitStats = async (req, res) => {
  try {
    const today = getTodayDate();

    const todayRecord = await Visit.findOne({ date: today });
    let todayCount = 0;
    if (todayRecord) {
      todayCount = todayRecord.count;
    }

    const allRecords = await Visit.find();
    let totalVisits = 0;
    for (let i = 0; i < allRecords.length; i++) {
      totalVisits = totalVisits + allRecords[i].count;
    }

    const lastDays = await Visit.find().sort({ date: -1 }).limit(7);

    res.status(200).json({
      today: todayCount,
      total: totalVisits,
      lastDays: lastDays,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { recordVisit, getVisitStats };