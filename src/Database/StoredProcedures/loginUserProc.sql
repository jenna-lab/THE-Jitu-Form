CREATE OR ALTER PROCEDURE loginUserProc(@jituEmail VARCHAR(50))
AS 
BEGIN 
SELECT * FROM userTable 
WHERE jituEmail=@jituEmail
END;