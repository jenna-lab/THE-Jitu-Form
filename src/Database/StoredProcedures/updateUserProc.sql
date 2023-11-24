CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(50),
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @jituEmail VARCHAR(50),
    @userCohort INT
AS 
BEGIN 
    UPDATE userTable 
    SET 
        firstName = @firstName,
        lastName = @lastName,
        jituEmail = @jituEmail,
        userCohort = @userCohort
    WHERE id = @id;
END;
