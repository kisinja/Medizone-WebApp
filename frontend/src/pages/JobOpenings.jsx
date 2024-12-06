import { useEffect } from "react";

const jobs = [
    {
        id: 1,
        title: "UI/UX Designer",
        location: "Remote",
        type: "Full-Time",
        description: "We are looking for a creative UI/UX Designer to join our team. The ideal candidate will have experience in designing user-centric applications and creating intuitive interfaces.",
        responsibilities: [
            "Design user interfaces for web and mobile applications.",
            "Collaborate with product managers and developers.",
            "Conduct user research and usability testing.",
        ],
        requirements: [
            "Proven experience as a UI/UX Designer or similar role.",
            "Strong portfolio of design projects.",
            "Proficient in design tools such as Figma, Sketch, or Adobe XD.",
        ],
    },
    {
        id: 2,
        title: "Software Engineer",
        location: "Nairobi, Westlands",
        type: "Full-Time",
        description: "Join our team as a Software Engineer. We are looking for someone who is passionate about coding, problem-solving, and building high-quality applications.",
        responsibilities: [
            "Develop and maintain software applications.",
            "Write clean, scalable code and perform code reviews.",
            "Collaborate with cross-functional teams.",
        ],
        requirements: [
            "Bachelor's degree in Computer Science or related field.",
            "Proven experience as a Software Engineer.",
            "Proficiency in JavaScript, React, Node.js, and databases.",
        ],
    },
];

const JobCard = ({ job }) => {

    useEffect(() => {
        document.title = `Job Openings - Medizone`;
    }, []);

    return (
        <div className="job-card bg-white p-6 rounded-lg shadow-md my-4">
            <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-500 mb-1">{job.location} | {job.type}</p>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <h4 className="text-lg font-semibold">Responsibilities:</h4>
            <ul className="list-disc list-inside mb-4">
                {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                ))}
            </ul>
            <h4 className="text-lg font-semibold">Requirements:</h4>
            <ul className="list-disc list-inside mb-4">
                {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Now
            </button>
        </div>
    )
};

const JobOpenings = () => (
    <div className="jobs-section bg-gray-100 p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center">Job Openings</h1>
        <div className="jobs-list max-w-4xl mx-auto">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    </div>
);

export default JobOpenings;