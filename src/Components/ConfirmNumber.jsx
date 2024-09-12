import React, { useState } from "react";
import { verifyPhoneCode } from "../services/registerService";

export default function ConfirmNumber({ onClose, phone , phoneVerificationKey }) {
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleResend = () => {
    console.log("Resend confirmation code");
  };

  const handleVerifyCode = async () => {
    try {
      const result = await verifyPhoneCode(confirmationCode , phoneVerificationKey);
      console.log("Code verification result:", result);
    } catch (error) {
      console.error("Code verification error:", error);
    }
  };
  const handleBack = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-right rtl space-y-8">
        <h2 className="text-lg font-bold border-b-2 pb-3 border-gray-300">
          تأكيد الرقم
        </h2>
        <p className="mb-4">
          أدخل الرمز الذي أرسلناه للتو إلى  : {phone}
        </p>
        <input
          type="text"
          placeholder="أدخل الرمز"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full text-right"
        />
        <p className="text-sm text-gray-600 mb-8">
          لم يصلك الرمز؟ انتظر بضع دقائق 5:58 و حاول مجدداً
        </p>
        <div className="flex justify-between space-x-reverse space-x-4">
          <button
            onClick={handleVerifyCode}
            className="bg-[#CCCCCC] text-black px-4 py-2 rounded-lg w-full mx-2"
          >
            التحقق من الصحة
          </button>
          <button
            onClick={handleBack}
            className="bg-[#184d9a] text-white px-4 py-2 rounded-lg w-full mx-2"
          >
            السابق
          </button>
          <button
            onClick={handleResend}
            className="bg-[#CCCCCC] text-black px-4 py-2 rounded-lg w-full mx-2"
          >
            إعادة إرسال الرمز
          </button>
        </div>
      </div>
    </div>
  );
}
