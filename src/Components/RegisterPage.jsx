import React, { useState } from "react";
import {
  getUserByNationalId,
  verifyPhoneNumber,
  verifyEmail,
  uploadFile,
  registerGovFacility,
} from "../services/registerService";
import ConfirmNumber from "./ConfirmNumber.JSX";
import ConfirmEmail from "./ConfirmEmail";
export default function RegisterPage() {
  const [national_id, setNationalId] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [facility_name, setFacilityName] = useState("");
  const [fullNameEn, setFullNameEn] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [isAutofillDisabled, setIsAutofillDisabled] = useState(false);
  const [phoneVerificationResult, setPhoneVerificationResult] = useState(null);
  const [emailVerificationResult, setEmailVerificationResult] = useState(null);
  const [isPhonePopupVisible, setIsPhonePopupVisible] = useState(false);
  const [isEmailPopupVisible, setIsEmailPopupVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    applicant_user_profile_id: "",
    applicant_user_type_id: "",
    facility_name: "",
    phone: "",
    mobile: "",
    email: "",
    attachments: [
      {
        doc_type_id: 1,
        path: "",
      },
    ],
  });
  const countryCodes = [
    { value: "+1", label: "United States (+1)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+91", label: "India (+91)" },
    { value: "+33", label: "France (+33)" },
    { value: "+962", label: "Jordan (+962)" },
  ];

  const handleInquiry = async () => {
    try {
      const result = await getUserByNationalId(national_id, birth_date);
      setFullNameEn(result.full_name_en);
      setFullName(result.full_name);
      setIdNumber(result.id_number);
      setIsAutofillDisabled(true);
    } catch (error) {
      console.error("Inquiry error:", error);
    }
  };
  const handleUploadFile = async (file) => {
    try {
      const result = await uploadFile(file);
      if (result.success) {
        console.log("File uploaded successfully:", result.data.path);
        setFormData((prevData) => ({
          ...prevData,
          attachments: [
            {
              doc_type_id: 1,
              path: result.data.path,
            },
          ],
        }));
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(event.target.files[0]);
      setFileName(file.name);
    }
  };
  const handleUploadClick = () => {
    if (file) {
      handleUploadFile(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      let fullPhoneNumber = `${selectedCountryCode}${phone}`;
      fullPhoneNumber = fullPhoneNumber.replace(/\s+/g, "");
      const result = await verifyPhoneNumber(fullPhoneNumber);
      console.log("Phone verification result:", result);
      setPhoneVerificationResult(result);
      setIsPhonePopupVisible(true);
    } catch (error) {
      console.error("Phone verification error:", error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const result = await verifyEmail(email);
      console.log("Email verification result:", result);
      setEmailVerificationResult(result);
      setIsEmailPopupVisible(true);
    } catch (error) {
      console.error("Email verification error:", error);
    }
  };

  const handleClosePhonePopup = () => {
    setIsPhonePopupVisible(false);
  };

  const handleCloseEmailPopup = () => {
    setIsEmailPopupVisible(false);
  };
  const handleRegisterGovFacility = async () => {
    try {
      // Update formData with current state values
      setFormData((prevData) => ({
        ...prevData,
        facility_name: facility_name,
        phone: phone,
        email: email,
        mobile: document.getElementById("input7").value,
      }));

      const result = await registerGovFacility(formData);
      console.log("Registration result:", result);
      setNationalId("");
      setBirthDate("");
      setFullNameEn("");
      setFullName("");
      setIdNumber("");
      setPhone("");
      setEmail("");
      setSelectedCountryCode("");
      setFileName("");
      setFile(null);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col font-[sans-serif]">
      <div className="bg-[#184d9a] h-10 flex items-center justify-center"></div>

      <div
        className="bg-white p-4 text-right rtl"
        style={{ marginRight: "80px" }}
      >
        <h2 className="text-2xl font-semibold mb-2">تسجيل جهة حكومية</h2>
        <p className="text-lg font-bold text-gray-500">يرجى ملء المعلومات التالية للتسجيل</p>
        </div>

      <div className="relative container mx-auto p-6 border border-gray-300 mt-4 rtl">
        <div className="absolute right-4 top-[-1.5rem] flex justify-center rounded-lg overflow-hidden">
          <div className="relative bg-[#184d9a] text-white p-2">
            <h3 className="relative z-10 text-lg">تسجيل حساب جهة حكومية</h3>
            <span className="absolute inset-y-0 right-0 border-r-2 border-white" />
          </div>
        </div>
        <form className="pt-4 space-y-4">
          <div className="space-y-4 mb-12">
            <div className="flex flex-row-reverse space-x-reverse space-x-4 mb-4">
              <div className="flex-1 max-w-xs">
                <label htmlFor="input1" className="block text-right mb-1">
                  الرقم الوطني
                </label>
                <input
                  id="input1"
                  type="text"
                  placeholder="مثال"
                  value={national_id}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="border border-black p-2 rounded w-full text-right rtl"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label htmlFor="input2" className="block text-right mb-1">
                  تاريخ الميلاد
                </label>
                <input
                  id="input2"
                  type="date"
                  placeholder="مثال"
                  value={birth_date}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="border border-black p-2 rounded w-full text-right rtl"
                />
              </div>
              <button
                type="button"
                onClick={handleInquiry}
                className="bg-[#184d9a] text-white px-4 py-2 rounded self-end"
              >
                استعلام
              </button>
            </div>

            <div className="flex flex-row-reverse space-x-reverse space-x-4 mb-4">
              <div className="flex-1 max-w-xs">
                <label htmlFor="input3" className="block text-right mb-1">
                  الاسم الكامل (بالانجليزية)
                </label>
                <input
                  id="input3"
                  type="text"
                  placeholder="مثال"
                  value={fullNameEn}
                  onChange={(e) => setFullNameEn(e.target.value)}
                  className={`border ${
                    isAutofillDisabled
                      ? "bg-gray-200 cursor-not-allowed"
                      : "border-black"
                  } p-2 rounded w-full text-right rtl`}
                  disabled={isAutofillDisabled}
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label htmlFor="input4" className="block text-right mb-1">
                  الاسم الكامل (بالعربية)
                </label>
                <input
                  id="input4"
                  type="text"
                  placeholder="مثال"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`border ${
                    isAutofillDisabled
                      ? "bg-gray-200 cursor-not-allowed"
                      : "border-black"
                  } p-2 rounded w-full text-right rtl`}
                  disabled={isAutofillDisabled}
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label htmlFor="input5" className="block text-right mb-1">
                  رقم الهوية
                </label>
                <input
                  id="input5"
                  type="text"
                  placeholder="مثال"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className={`border ${
                    isAutofillDisabled
                      ? "bg-gray-200 cursor-not-allowed"
                      : "border-black"
                  } p-2 rounded w-full text-right rtl`}
                  disabled={isAutofillDisabled}
                />
              </div>
            </div>

            <div className="flex flex-row-reverse space-x-reverse space-x-4">
              <div className="flex-1 max-w-xs">
                <label htmlFor="input6" className="block text-right mb-1">
                  *اسم الجهة الحكومية
                </label>
                <input
                  id="input6"
                  value={facility_name}
                  type="text"
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="مثال"
                  className="border border-black p-2 rounded w-full text-right rtl"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label htmlFor="input7" className="block text-right mb-1">
                  رقم الهاتف الاردني{" "}
                </label>
                <input
                  id="input7"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="مثال"
                  className="border border-black p-2 rounded w-full text-right rtl"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label htmlFor="input8" className="block text-right mb-1">
                  الرقم التعريفي للجهة الحكومية
                </label>
                <input
                  id="input8"
                  type="text"
                  placeholder="مثال"
                  className="border border-black p-2 rounded w-full text-right"
                />
              </div>
            </div>
          </div>

          <div className="relative space-y-4 mt-8 p-4 border border-gray-400 rtl">
            <div className="absolute right-4 top-[-1rem] flex justify-center rounded-lg overflow-hidden">
              <div className="relative bg-[#184d9a] text-white p-2">
                <h3 className="relative z-10 text-lg">معلومات الاتصال</h3>
                <span className="absolute inset-y-0 right-0 border-r-2 border-white" />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex flex-row-reverse space-x-reverse space-x-4 mb-4">
                <div className="flex-1 max-w-xs">
                  <label
                    htmlFor="countryCode"
                    className="block text-right mb-1"
                  >
                    *الرمز الدولي
                  </label>
                  <select
                    id="countryCode"
                    className="border border-black p-2 rounded w-full text-right rtl"
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                  >
                    <option value="" disabled>
                      اختر رمز الدولة
                    </option>
                    {countryCodes.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 max-w-xs">
                  <label htmlFor="input10" className="block text-right mb-1">
                    * الهاتف النقال
                  </label>
                  <input
                    id="input10"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال"
                    className="border border-black p-2 rounded w-full text-right rtl"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyPhoneNumber}
                  className="bg-[#184d9a] text-white px-4 py-2 rounded self-end"
                >
                  تحقق من رقم الهاتف
                </button>
              </div>

              <div className="flex flex-row-reverse space-x-reverse space-x-4">
                <div className="flex-1 max-w-xs">
                  <label htmlFor="input11" className="block text-right mb-1">
                    * البريد الالكتروني
                  </label>
                  <input
                    id="input11"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="مثال"
                    className="border border-black p-2 rounded w-full text-right rtl"
                  />
                </div>
                <button
                  type="button" 
                  onClick={handleVerifyEmail}
                  className="bg-[#184d9a] text-white px-4 py-2 rounded self-end"
                >
                  تحقق من البريد الالكتروني
                </button>
              </div>
            </div>
          </div>
          <div className="relative space-y-4 mt-8 p-4 border border-gray-400 rtl">
            <p className="text-[#184d9a] text-lg font-semibold mb-4 text-right">
              وثيقة اثبات قدرة الموظف من الجهة الحكومية على تمثيلها
            </p>
            <label
              htmlFor="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded flex items-center cursor-pointer border-2 border-gray-300 border-dashed w-full max-w-7xl h-20 mx-auto font-[sans-serif]"
            >
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#184d9a] text-white px-8 py-3 rounded ml-4"
              >
                تحميل
              </button>
              <div className="flex-1 flex items-center justify-end px-4 space-x-2">
                <span className="text-center">
                  {fileName ||
                    "تحميل وثيقة اثبات قدرة الموظف من الجهة الحكومية على تمثيلها"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
              </div>
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <ul className="list-disc text-sm text-red-600 font-bold rtl pl-6 pr-8">
              <li className="flex items-center justify-end text-right">
                <span className="mr-2">
                  السماح بارفاق انوع معينة فقط pdf او png او jpg او jpeg
                </span>
              </li>
              <li className="flex items-center justify-end text-right">
                <span className="mr-2">الحجم الملف لا يتجاوز 5mb</span>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className="flex justify-center space-x-4 py-4">
        <button
          type="button"
          className="bg-[#184d9a] text-white px-8 py-3 text-lg rounded-lg"
        >
          خروج
        </button>
        <button
          type="button"
          className="bg-[#184d9a] text-white px-8 py-3 text-lg rounded-lg"
          onClick={handleRegisterGovFacility}
        >
          انشاء حساب
        </button>
      </div>

      {isPhonePopupVisible && (
        <ConfirmNumber
          onClose={handleClosePhonePopup}
          phone={phone}
          phoneVerificationKey={phoneVerificationResult}
        />
      )}
      {isEmailPopupVisible && (
        <ConfirmEmail
          onClose={handleCloseEmailPopup}
          email={email}
          emailVerificationKey={emailVerificationResult}
        />
      )}
    </div>
  );
}
