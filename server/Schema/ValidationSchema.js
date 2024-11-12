const z = require('zod')
const employeeInputs = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8),
});
const loginInputs = z.object({
    email:z.string().email(),
    password:z.string().min(8),
});
module.exports={employeeInputs,loginInputs};