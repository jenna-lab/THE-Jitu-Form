CREATE OR ALTER PROCEDURE registerUserProc(@id VARCHAR(50),@firstName VARCHAR(50),@lastName VARCHAR(50),@userCohort INT,@jituEmail VARCHAR(100),@password VARCHAR(MAX))
AS 
BEGIN 
INSERT INTO userTable(id,firstName,lastName,jituEmail,password,userCohort) 
VALUES (@id,@firstName,@lastName,@jituEmail,@password,@userCohort)
END;