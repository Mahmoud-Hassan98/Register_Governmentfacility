const BASE_URL = 'https://jma.api.local.eqratech.com';

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};
export const getUserByNationalId = async (nationalId, birthDate) => {
  const formattedBirthDate = formatDate(birthDate);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/unauth/user/getUserByNationalId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        national_id: nationalId,
        birth_date: formattedBirthDate,
      }),
    });

    if (response.ok) {
      const data = await response.json(); 
      console.log(data);
      
      return {
        full_name: data.data.full_name, 
        full_name_en: data.data.full_name_en,
        id_number: data.data.id_number,
      };
    }

    throw new Error('Network response was not ok');
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; 
  }
};

export const verifyPhoneNumber = async (phoneNumber) => {
  const formattedPhoneNumber = phoneNumber.replace(/\s+/g, '');
  try {
    const response = await fetch(`${BASE_URL}/api/v1/unauth/verifyNonUserPhone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formattedPhoneNumber }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.key;
    } else {
      const errorText = await response.text(); 
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; 
  }
};
export const verifyPhoneCode = async ( confirmationCode, phoneVerificationKey) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/unauth/phone/verifyCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        verification_code:phoneVerificationKey ,
         key : confirmationCode
        }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } else {
      const errorText = await response.text(); 
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; 
  }
};
export const verifyEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/unauth/verifyNonUserEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.key;
    } else {
      const errorText = await response.text(); 
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; 
  }
};
export const verifyEmailCode = async ( confirmationCode, emailVerificationKey) => {
  console.log(emailVerificationKey);
  
  try {
    const response = await fetch(`${BASE_URL}/api/v1/unauth/email/verifyCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        verification_code: emailVerificationKey ,
         key : confirmationCode
        }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } else {
      const errorText = await response.text(); 
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; 
  }
};
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file); 

    const response = await fetch(`${BASE_URL}/api/v1/unauth/facility/storeFile`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } else {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};

export const registerGovFacility = async (data) => {
  
  try {
    const response = await fetch(`${BASE_URL}/api/v1/officer/facility/registerGovFacility`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorText = await response.text(); 
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; 
  }
};
