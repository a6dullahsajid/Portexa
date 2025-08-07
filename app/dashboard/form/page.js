"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./FormPage.module.css";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useCloudinaryUpload from "@/app/hooks/useCloudinaryUpload";
import { setName, setProfileImage, setTitle, setBio, setResume, setSkills, setExperience, setProjects, setConnectDesc, setX, setGithub, setLinkedin, setEmail } from "@/store/userDataSlice";
import Image from "next/image";

export default function PortfolioForm() {

    useEffect(() => {
        const bgCanvas = document.getElementById("bgCanvas");
        if (bgCanvas) bgCanvas.style.display = "none";
        return () => {
            if (bgCanvas) bgCanvas.style.display = "block";
        };
    }, []);


    const dispatch = useDispatch();
    const {
        details: {
            name,
            title,
            profileImage,
            bio,
            resume,
            skills,
            experience,
            projects,
            connectDesc,
            email,
            linkedin,
            github,
            x
        },
        template
    } = useSelector((state) => state.userData);

    const { uploadImage, uploading } = useCloudinaryUpload();

    const [step, setStep] = useState(1);
    const [localProfileFile, setLocalProfileFile] = useState("");

    const [skillInput, setSkillInput] = useState("");
    const [experienceInput, setExperienceInput] = useState({
        company: "",
        position: "",
        from: "",
        to: "",
        work: ""
    });

    const [project, setProject] = useState({
        title: "",
        desc: "",
        tech: "",
        image: "",
        prevLink: "",
        githubLink: ""
    });

    const handleNameChange = (e) => {
        dispatch(setName(e.target.value));
    }

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value))
    }

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLocalProfileFile(file);
        }
        console.log(file);
    };

    const handleUploadProfileImage = async () => {
        if (!localProfileFile) {
            toast.error("No Image Selected");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error("Image must be smaller than 10MB");
            return;
        }
        uploadImage(localProfileFile, (url) => {
            dispatch(setProfileImage(url));
        });
    };

    const handleBioChange = (e) => {
        dispatch(setBio(e.target.value))
    }

    const handleResumeChange = (e) => {
        dispatch(setResume(e.target.value))
    }

    const handleAddSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed && !skills.includes(trimmed)) {
            dispatch(setSkills([...skills, trimmed]));
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (indexToRemove) => {
        const updatedSkills = skills.filter((_, idx) => idx !== indexToRemove);
        dispatch(setSkills(updatedSkills));
    };

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProject((prev) => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleAddProject = async () => {
        const { title, desc, githubLink, image } = project;

        if (!title || !desc || !githubLink) {
            toast.error("Please fill in all required project fields.");
            return;
        }

        const updateProjects = (imageUrl = "") => {
            const updatedProjects = [...projects, {
                ...project,
                image: imageUrl
            }];
            dispatch(setProjects(updatedProjects));

            setProject({
                title: "",
                desc: "",
                tech: "",
                image: "",
                prevLink: "",
                githubLink: ""
            });
        };

        // If image is provided
        if (image) {
            if (image.size > 10 * 1024 * 1024) {
                toast.error("Image must be smaller than 10MB");
                return;
            }

            uploadImage(image, (url) => {
                updateProjects(url);
            });
        } else {
            updateProjects();
        }
    };




    const handleRemoveProject = (indexToRemove) => {
        const updatedProjects = projects.filter((_, index) => index !== indexToRemove);
        dispatch(setProjects(updatedProjects));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setExperienceInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddExperience = () => {
        const { company, position, from, to, work } = experienceInput;
        if (!company || !position || !work || !from || !to) {
            toast.error("Please fill all experience fields.");
            return;
        }
        const updated = [...experience, experienceInput];
        dispatch(setExperience(updated));
        setExperienceInput({ company: "", position: "", from: "", to: "", work: "" });
    };


    const handleRemoveExperience = (indexToRemove) => {
        const updated = experience.filter((_, index) => index !== indexToRemove);
        dispatch(setExperience(updated));
    };



    const handleConnectDescChange = (e) => {
        dispatch(setConnectDesc(e.target.value))
    }
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    }
    const handleLinkedinChange = (e) => {
        dispatch(setLinkedin(e.target.value))
    }
    const handleGithubChange = (e) => {
        dispatch(setGithub(e.target.value))
    }
    const handlexChange = (e) => {
        dispatch(setX(e.target.value))
    }

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const userData = useSelector((state) => state.userData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit Chala");
        console.log(userData);

        try {
            const res = await fetch("/api/saveUserData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await res.json();

            if (result.success) {
                toast.success("User data saved successfully!");
                console.log("Saved ID:", result.insertedId);
            } else {
                toast.error("Failed to save data.");
                console.log(result.error);
            }
        } catch (err) {
            console.log("Error submitting form:", err);
            toast.error("Something went wrong.");
        }
    };



    return (
        <>
            <Navbar />
            <main className={styles.template1}>
                <form onSubmit={handleSubmit} className={styles.portfolioForm}>
                    <h2 className={styles.stepTitle}>
                        {step === 1 ? "Basic Info" : step === 2 ? "Projects" : step === 3 ? "Experience" : "Contact Info"}
                    </h2>

                    {/* STEP 1 - Personal Info + Skills */}
                    {step === 1 && (
                        <div className={styles.formSection}>
                            <input
                                name="name"
                                placeholder="Full Name"
                                onChange={handleNameChange}
                                value={name}
                                className={styles.formInput}
                            />
                            <input
                                name="title"
                                placeholder="Role / Title"
                                onChange={handleTitleChange}
                                value={title}
                                className={styles.formInput}
                            />
                            <div className={styles.uploadImage}>
                                <input
                                    name="profileImage"
                                    type="file"
                                    placeholder="Upload Image(max 10MB)"
                                    accept="image/png, image/jpeg"
                                    onChange={handleProfileChange}
                                    className={`${styles.formInput} ${styles.imageInput}`}
                                />
                                {/* {profileImage && <img width={52} height={42} src={profileImage} alt="profile" />} */}
                                <button
                                    type="button"
                                    onClick={handleUploadProfileImage}
                                    className={styles.btnUpload}
                                >
                                    Add Profile Image
                                </button>
                            </div>
                            <textarea
                                name="bio"
                                placeholder="About Me"
                                onChange={handleBioChange}
                                value={bio}
                                className={styles.formTextarea}
                            />

                            <input
                                name="resume"
                                placeholder="Resume Link"
                                onChange={handleResumeChange}
                                value={resume}
                                className={styles.formInput}
                            />
                            <div className={styles.skillInputWrapper}>
                                <input
                                    name="skill"
                                    type="text"
                                    placeholder="Enter a skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    className={styles.formInput}
                                />
                                <button type="button" onClick={handleAddSkill} className={styles.btnAdd}>Add Skill</button>
                            </div>

                            <div className={styles.skillList}>
                                {skills.map((skill, index) => (
                                    <div key={index} className={styles.skillChip}>
                                        {skill}
                                        <button type="button" onClick={() => handleRemoveSkill(index)} className={styles.removeSkill}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.formNav}>
                                <Link href="/dashboard">
                                    <button type="button" className={styles.btnPrev}>Go Back</button>
                                </Link>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 - Projects */}
                    {step === 2 && (
                        <div className={styles.formSection}>
                            {projects.map((proj, index) => (
                                <div key={index} className={styles.projectEntry}>
                                    <div className={styles.formInput}>{proj.title}</div>
                                    <div className={styles.formInput}>{proj.desc}</div>
                                    <div className={styles.formInput}>{proj.tech}</div>
                                    <div className={styles.formInput}>{proj.prevLink}</div>
                                    <div className={styles.formInput}>{proj.githubLink}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className={styles.btnDelete}
                                    >
                                        × Remove
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />

                            <textarea
                                name="desc"
                                placeholder="Project Description"
                                value={project.desc}
                                onChange={handleProjectChange}
                                className={styles.formTextarea}
                            />

                            <input
                                type="text"
                                name="tech"
                                placeholder="Technologies Used"
                                value={project.tech}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />
                            {/* <div className="upload-image"> */}
                            <input
                                name="projectImage"
                                type="file"
                                placeholder="Upload Image(max 10MB)"
                                accept="image/png, image/jpeg"
                                onChange={handleProjectImageChange}
                                className={`${styles.formInput} ${styles.imageInput}`}
                            />
                            {/* </div> */}

                            <input
                                type="text"
                                name="prevLink"
                                placeholder="Live Preview Link"
                                value={project.prevLink}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />

                            <input
                                type="text"
                                name="githubLink"
                                placeholder="GitHub Repo Link"
                                value={project.githubLink}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />
                            <button type="button" onClick={handleAddProject} className={styles.btnAdd}>
                                Add Project
                            </button>

                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* STEP-3 Expereince Details */}
                    {step === 3 && (
                        <div className={styles.formSection}>
                            <p>You can skip this if you are a fresher</p>
                            {experience.map((exp, index) => {
                                return <div key={index} className={styles.projectEntry}>
                                    <div className={styles.formInput}>{exp.company}</div>
                                    <div className={styles.formInput}>{exp.position}</div>
                                    <div className={styles.formInput}>{exp.work}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExperience(index)}
                                        className={styles.btnDelete}
                                    >
                                        × Remove
                                    </button>
                                </div>
                            })}

                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={experienceInput.company}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={experienceInput.position}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />
                            <input
                                type="text"
                                name="from"
                                placeholder="Start date"
                                value={experienceInput.from}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />
                            <input
                                type="text"
                                name="to"
                                placeholder="End date"
                                value={experienceInput.to}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <textarea
                                type="text"
                                name="work"
                                placeholder="Describe your role in it"
                                value={experienceInput.work}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <button type="button" onClick={handleAddExperience} className={styles.btnAdd}>
                                Add Experience
                            </button>

                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className={styles.formSection}>
                            <textarea
                                name="connectDesc"
                                placeholder="Say something for your connect section"
                                onChange={handleConnectDescChange}
                                value={connectDesc}
                                className={styles.formTextarea}
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                value={email}
                                className={styles.formInput}
                            />
                            <input
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                onChange={handleLinkedinChange}
                                value={linkedin}
                                className={styles.formInput}
                            />
                            <input
                                name="github"
                                placeholder="GitHub URL"
                                onChange={handleGithubChange}
                                value={github}
                                className={styles.formInput}
                            />
                            <input
                                name="x"
                                placeholder="Twitter / X Profile"
                                onChange={handlexChange}
                                value={x}
                                className={styles.formInput}
                            />
                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="submit" className={styles.btnSubmit}>Finish</button>
                            </div>
                        </div>
                    )}
                </form>
            </main>
        </>
    );
}

