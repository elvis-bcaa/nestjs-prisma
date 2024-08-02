ALTER TABLE "Schedule"
ADD CONSTRAINT "endTime_greater_than_startTime"
CHECK ("endTime" > "startTime");