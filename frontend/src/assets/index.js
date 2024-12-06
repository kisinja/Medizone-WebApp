import doctor from './doctor.jpeg';
import doctor1 from './doctor-1.jpeg';
import doctor2 from './doctor-2.png';

import { assets } from './assets/assets_frontend/assets';


export const specialityData = [
    {
        speciality: "General physician",
        image: doctor
    },
    {
        speciality: "Gynecologist",
        image: doctor1
    },
    {
        speciality: "Dermatologist",
        image: doctor2
    },
    {
        speciality: "Pediatrician",
        image: doctor
    },
    {
        speciality: "Neurologist",
        image: doctor1
    },
    {
        speciality: "Gastroenterologist",
        image: doctor2
    },
];

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James', 
        image: assets.doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Richard has a strong commitment to delivering comprehensive medical care.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Elvis Githinji',
        image: assets.doc2,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '12 years',
        about: 'Dr. Elvis has a strong commitment to delivering comprehensive medical care.',
        fees: 85,
        address: {
            line1: 'Thika, Muguga',
            line2: 'Thika, Section 9'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Bruce Gabriel',
        image: assets.doc3,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 years',
        about: 'Dr. Bruce has a strong commitment to delivering comprehensive medical care.',
        fees: 35,
        address: {
            line1: 'Kajiado North, Ongata Rongai',
            line2: 'Hillside, Utawala'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Andrew Mugalo',
        image: doctor2,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 years',
        about: 'Dr. Andrew has a strong commitment to delivering comprehensive medical care.',
        fees: 30,
        address: {
            line1: 'Kajiado North, Ongata Rongai',
            line2: 'Hillside, Utawala'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Sarah Kimani',
        image: 'https://i.pinimg.com/236x/3b/5f/27/3b5f271e7c34c800c0e8d1f2703f0b61.jpg',
        speciality: 'Cardiologist',
        degree: 'MD',
        experience: '10 years',
        about: 'Dr. Sarah is an experienced cardiologist dedicated to patient-centered care.',
        fees: 50,
        address: {
            line1: 'Westlands, Nairobi',
            line2: 'Parklands, Nairobi'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Michael Mwangi',
        image: 'https://i.pinimg.com/236x/b7/da/ee/b7daee45b28bbd8a5020079ae1575a50.jpg',
        speciality: 'Dermatologist',
        degree: 'MD',
        experience: '5 years',
        about: 'Dr. Michael is highly skilled in the diagnosis and treatment of skin disorders.',
        fees: 45,
        address: {
            line1: 'Ridgeways, Kiambu',
            line2: 'Thindigua, Kiambu'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Joyce Wanjiku',
        image: 'https://i.pinimg.com/236x/a5/f3/70/a5f370775d9adcdf317b1fe040ddef78.jpg',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '7 years',
        about: 'Dr. Joyce is passionate about women’s health and well-being.',
        fees: 40,
        address: {
            line1: 'Kilimani, Nairobi',
            line2: 'Lavington, Nairobi'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Daniel Okoth',
        image: 'https://i.pinimg.com/236x/23/e7/c0/23e7c0fa712d53620e7925e7fb532791.jpg',
        speciality: 'Orthopedic Surgeon',
        degree: 'MS',
        experience: '15 years',
        about: 'Dr. Daniel is dedicated to treating musculoskeletal conditions with the latest surgical techniques.',
        fees: 70,
        address: {
            line1: 'Karen, Nairobi',
            line2: 'Langata, Nairobi'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Elizabeth Achieng',
        image: 'https://i.pinimg.com/236x/e3/9a/13/e39a13b23a0bedca5d4267374d42143a.jpg',
        speciality: 'Oncologist',
        degree: 'MD',
        experience: '8 years',
        about: 'Dr. Elizabeth specializes in cancer diagnosis and treatment, providing compassionate care.',
        fees: 60,
        address: {
            line1: 'Runda, Nairobi',
            line2: 'Muthaiga, Nairobi'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Peter Ouma',
        image: 'https://i.pinimg.com/236x/55/7c/4e/557c4eaa60fe2f5665b4a80a789fed22.jpg',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '12 years',
        about: 'Dr. Peter provides expert care in treating neurological disorders with a patient-focused approach.',
        fees: 65,
        address: {
            line1: 'Gigiri, Nairobi',
            line2: 'Kileleshwa, Nairobi'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Mary Nyaga',
        image: 'https://i.pinimg.com/236x/97/c8/11/97c8111d660f17cc4a85816cebeb0020.jpg',
        speciality: 'Psychiatrist',
        degree: 'MD',
        experience: '6 years',
        about: 'Dr. Mary is committed to improving mental health through personalized treatment plans.',
        fees: 55,
        address: {
            line1: 'South B, Nairobi',
            line2: 'Embakasi, Nairobi'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. John Wekesa',
        image: 'https://i.pinimg.com/236x/58/f9/c8/58f9c88884f49d419253d9419651283a.jpg',
        speciality: 'Urologist',
        degree: 'MS',
        experience: '9 years',
        about: 'Dr. John is a urology expert who treats kidney, bladder, and male reproductive health issues.',
        fees: 50,
        address: {
            line1: 'Kasarani, Nairobi',
            line2: 'Ruaraka, Nairobi'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Stella Muthoni',
        image: 'https://i.pinimg.com/236x/c9/4e/55/c94e55f48966daa8c6d8097ff4127026.jpg',
        speciality: 'ENT Specialist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Stella specializes in treating ear, nose, and throat disorders for patients of all ages.',
        fees: 35,
        address: {
            line1: 'Kikuyu, Kiambu',
            line2: 'Limuru, Kiambu'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Brian Mutua',
        image: 'https://i.pinimg.com/236x/4f/ce/83/4fce83916bbe14b87a5f60afa9284c91.jpg',
        speciality: 'Gastroenterologist',
        degree: 'MD',
        experience: '11 years',
        about: 'Dr. Brian has extensive experience in treating digestive tract and liver diseases.',
        fees: 60,
        address: {
            line1: 'Upper Hill, Nairobi',
            line2: 'Hurlingham, Nairobi'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Angela Owino',
        image: 'https://i.pinimg.com/236x/1b/0a/41/1b0a41cf2132a34bf05a9b4dee30c1a6.jpg',
        speciality: 'Ophthalmologist',
        degree: 'MBBS',
        experience: '10 years',
        about: 'Dr. Angela specializes in eye care and surgery, providing expert treatment for vision disorders.',
        fees: 50,
        address: {
            line1: 'Mombasa Road, Nairobi',
            line2: 'Syokimau, Nairobi'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Patrick Mworia',
        image: 'https://i.pinimg.com/474x/60/1c/3a/601c3a9cc68c8c71d9ad1ca9e68ec805.jpg',
        speciality: 'Pulmonologist',
        degree: 'MD',
        experience: '8 years',
        about: 'Dr. Patrick is an expert in lung and respiratory care, providing specialized treatments for breathing disorders.',
        fees: 45,
        address: {
            line1: 'Kileleshwa, Nairobi',
            line2: 'Westlands, Nairobi'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Lucy Kibet',
        image: 'https://i.pinimg.com/236x/1b/fb/b9/1bfbb95fb7ac4a064e7c203a31386e08.jpg',
        speciality: 'Radiologist',
        degree: 'MBBS',
        experience: '5 years',
        about: 'Dr. Lucy offers advanced imaging services for accurate diagnosis of various medical conditions.',
        fees: 40,
        address: {
            line1: 'Kitengela, Kajiado',
            line2: 'Athi River, Machakos'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Samuel Muriuki',
        image: 'https://i.pinimg.com/236x/4c/ee/6c/4cee6c22feeb033e76f96c293c48bb0a.jpg',
        speciality: 'General Surgeon',
        degree: 'MS',
        experience: '14 years',
        about: 'Dr. Samuel performs a wide range of surgical procedures with precision and care.',
        fees: 70,
        address: {
            line1: 'Ruaka, Kiambu',
            line2: 'Banana Hill, Kiambu'
        }
    },
    {
        _id: 'doc19',
        name: 'Dr. Faith Nyambura',
        image: 'https://i.pinimg.com/236x/e1/ad/63/e1ad63235ce8a7d9ac8846d50056eb0e.jpg',
        speciality: 'Endocrinologist',
        degree: 'MD',
        experience: '9 years',
        about: 'Dr. Faith specializes in hormonal disorders and diabetes care, ensuring optimal treatment.',
        fees: 55,
        address: {
            line1: 'Thika Road, Nairobi',
            line2: 'Ruiru, Kiambu'
        }
    },
    {
        _id: 'doc20',
        name: 'Dr. David Mathu',
        image: 'https://i.pinimg.com/236x/e1/ad/63/e1ad63235ce8a7d9ac8846d50056eb0e.jpg',
        speciality: 'Gastroenterologist',
        degree: 'MD',
        experience: '9 years',
        about: 'Dr. Mathu specializes in hormonal disorders and diabetes care, ensuring optimal treatment.',
        fees: 58,
        address: {
            line1: 'Thika Road, Nairobi',
            line2: 'Ruiru, Kiambu'
        }
    },
];