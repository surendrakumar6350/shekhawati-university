import { isValidMobileNumber, isValidOtp } from "./functions";

export const avatarOptions = [
  '/avatar1.png',
  '/avatar2.png',
  '/avatar3.png',
  '/avatar4.png',
]
//@ts-ignore
export async function onSubmitPhone(event: React.SyntheticEvent, phoneNumber, message, setIsLoading, sendOTP, setStep) {
  event.preventDefault();

  if (!isValidMobileNumber(phoneNumber)) {
    message.error('Please Enter Valid Number', 4000);
    return;
  }
  setIsLoading(true);
  try {
    const ans = await sendOTP({ mobile: phoneNumber });

    if (!ans) {
      message.error('Try again..', 4000);
      return;
    }

    if (ans.success) {
      setStep(ans.allReadyRegistered ? 3 : 2);
    } else {
      message.error('Try again..', 4000);
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    message.error('An error occurred. Please try again later.', 4000);
  } finally {
    setIsLoading(false);
  }
}

//@ts-ignore
export async function onSubmitOtp(event: React.SyntheticEvent, setIsLoading, otp, message, verifyOTP, phoneNumber, selectedAvatar, name) {
  event.preventDefault();
  setIsLoading(true);

  if (!isValidOtp(otp)) {
    setIsLoading(false);
    return message.error('Please Enter valid Otp', 4000);
  }

  try {
    const ans = await verifyOTP({ mobile: phoneNumber, otp, name, selectedAvatar });

    if (!ans) {
      return message.error('Try again..', 4000);
    }

    switch (ans.message) {
      case "Otp Expired, please try again":
        return message.error('Otp Expired, please try again', 4000);
      case "Wrong Otp":
        return message.error('Wrong Otp', 4000);
      default:
        if (ans.success) {
          window.location.href = "/";
          return message.success('Login successful 🎉', 4000);
        }
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    message.error('An error occurred. Please try again later.', 4000);
  } finally {
    setIsLoading(false);
  }
}


//@ts-ignore
export async function onSubmitProfile(event: React.SyntheticEvent, name, setStep, message) {
  event.preventDefault();
  const namePattern = /^[A-Za-z\s]+$/;

  if (name.length < 2 || !namePattern.test(name)) {
   return message.error('Please Enter Valid Name', 4000);
  }

  setStep(3);
}