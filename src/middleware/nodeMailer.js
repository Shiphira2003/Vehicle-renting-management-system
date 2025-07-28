"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
//Create a test account for transporter
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'hector.klocko@ethereal.email',
        pass: '7kN2reymVUHDBFts8m'
    }
});
function sendBookingEmail(to, vehicleName, totalAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        yield transporter.sendMail({
            from: '"Your Car Rental" <no-reply@yourcompany.com>',
            to,
            subject: 'Booking Confirmation',
            text: `Thank you for booking the ${vehicleName}. Total: $${totalAmount.toFixed(2)}.`,
        });
    });
}
// After saving booking to DB:
// //callback fn
// transporter.verify((success,error)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log('Server is ready to take our messages')
//     }
// })
(() => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: '"Hector Klocko"  <hector.klocko@ethereal.email>',
        to: "wachira.denis@teach2give.com",
        subject: "Hello ✔",
        text: "Hello World",
        html: "<b>Hello World</b>"
    });
    console.log("Message sent:", info.messageId);
}))();
