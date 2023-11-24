import * as joi from "joi";

const userLoginSchema = joi.object({
  jituEmail: joi.string().required().min(5).max(200).messages({
    "string.max": "Please Input Your userName with length 5 to 20",
  }),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const userRegisterSchema = joi.object({
  firstName: joi.string().required().min(5).max(20),
  lastName: joi.string().required().max(20).min(5),
  userCohort: joi.number().max(3).min(1).required(),
  jituEmail: joi
    .string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\"|,.<>?/~`]{8,}$")
    ),
});

export { userLoginSchema, userRegisterSchema };
