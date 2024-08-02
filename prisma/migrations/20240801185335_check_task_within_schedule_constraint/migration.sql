CREATE OR REPLACE FUNCTION check_task_within_schedule() RETURNS TRIGGER AS $$
BEGIN
  IF NEW."startTime" < (SELECT "startTime" FROM "Schedule" WHERE "id" = NEW."scheduleId") OR
     NEW."startTime" > (SELECT "endTime" FROM "Schedule" WHERE "id" = NEW."scheduleId") THEN
    RAISE EXCEPTION 'Task startTime must be within the startTime and endTime of the associated Schedule';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_within_schedule_trigger
BEFORE INSERT OR UPDATE ON "Task"
FOR EACH ROW
EXECUTE FUNCTION check_task_within_schedule();
