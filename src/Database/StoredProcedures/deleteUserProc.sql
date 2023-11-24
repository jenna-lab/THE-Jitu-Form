CREATE OR ALTER PROCEDURE deleteUser
    @id VARCHAR(50)
AS 
BEGIN 
    DELETE FROM userTable 
    WHERE id = @id;
END;
