CREATE OR ALTER PROCEDURE getOneUser
    @id VARCHAR(50)
AS 
BEGIN 
    SELECT * FROM userTable 
    WHERE id = @id;
END;
