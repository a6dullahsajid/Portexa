"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./form.module.css";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useCloudinaryUpload from "@/app/hooks/useCloudinaryUpload";
import { setName, setProfileImage, setTitle, setBio, setResume, setSkills, setExperience, setProjects, setConnectDesc, setX, setGithub, setLinkedin, setEmail } from "@/store/userDataSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        template,
        userName
    } = useSelector((state) => state.userData);

    const router = useRouter();
    const { uploadImage, uploading } = useCloudinaryUpload();

    const [isSubmitting, setIsSubmitting] = useState(false);
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
        if (localProfileFile.size > 10 * 1024 * 1024) {
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

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

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
                router.push(`/${userName}`);

            } else {
                toast.error("Failed to save data.");
                console.log(result.error);
                setIsSubmitting(false);
            }
        } catch (err) {
            console.log("Error submitting form:", err);
            toast.error("Something went wrong.");
            setIsSubmitting(false);
        }
    };



    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Portfolio Builder Form - Create Your Professional Portfolio",
        "description": "Build your professional portfolio with our easy-to-use form. Add your projects, experience, skills, and contact information.",
        "url": "https://portexa.vercel.app/dashboard/form",
        "mainEntity": {
            "@type": "WebApplication",
            "name": "Portexa Portfolio Builder",
            "applicationCategory": "Portfolio Builder",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "creator": {
                "@type": "Organization",
                "name": "Portexa"
            },
            "featureList": [
                "Project Management",
                "Experience Tracking",
                "Skills Management",
                "Contact Information",
                "Image Upload",
                "Multi-step Form"
            ]
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://portexa.vercel.app"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Dashboard",
                    "item": "https://portexa.vercel.app/dashboard"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Portfolio Form",
                    "item": "https://portexa.vercel.app/dashboard/form"
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Navbar />
            <main className={styles.template1}>
                <form onSubmit={handleSubmit} className={styles.portfolioForm} role="form" aria-label="Portfolio Builder Form">
                    <h1 className={styles.stepTitle}>
                        {step === 1 ? "Basic Information" : step === 2 ? "Projects & Work" : step === 3 ? "Professional Experience" : "Contact & Social Links"}
                    </h1>
                    <p className={styles.stepDescription}>
                        {step === 1 ? "Tell us about yourself and your professional background" : 
                         step === 2 ? "Showcase your projects and technical skills" : 
                         step === 3 ? "Add your work experience and career highlights" : 
                         "Add your contact information and social media links"}
                    </p>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <section className={styles.basicSection}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel} htmlFor="name">Name *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        onChange={handleNameChange}
                                        value={name}
                                        className={styles.formInput}
                                        required
                                        aria-describedby="name-help"
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Role / Title</label>
                                    <input
                                        name="title"
                                        placeholder="E.g. Data Engineer"
                                        onChange={handleTitleChange}
                                        value={title}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Profile</label>
                                    <div className={styles.profileInputWrapper}>
                                        <input
                                            name="profileImage"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleProfileChange}
                                            className={`${styles.formInput} ${styles.imageInput}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleUploadProfileImage}
                                            className={styles.btnUpload}
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>About</label>
                                    <textarea
                                        name="bio"
                                        placeholder="Write something for your about section"
                                        onChange={handleBioChange}
                                        value={bio}
                                        className={styles.formTextarea}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Resume</label>
                                    <input
                                        name="resume"
                                        placeholder="Enter a link to your resume"
                                        onChange={handleResumeChange}
                                        value={resume}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Skills</label>
                                    <div className={styles.skillInputWrapper}>
                                        <input
                                            type="text"
                                            placeholder="Enter a skill"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            className={styles.formInput}
                                        />
                                        <button type="button" onClick={handleAddSkill} className={styles.btnAdd}>Add Skill</button>
                                    </div>
                                </div>
                                <div className={styles.skillList}>
                                    {skills.map((skill, index) => (
                                        <div key={index} className={styles.skillChip}>
                                            {skill}
                                            <button type="button" onClick={() => handleRemoveSkill(index)} className={styles.removeSkill}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <div className={styles.formNav}>
                                <Link href="/dashboard">
                                    <button type="button" className={styles.btnPrev}>Go Back</button>
                                </Link>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <div className={styles.projectSection}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Project Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Name of Project"
                                        value={project.title}
                                        onChange={handleProjectChange}
                                        className={styles.formInput}
                                    />
                                    <label className={styles.formLabel}>Project Description</label>
                                    <textarea
                                        name="desc"
                                        placeholder="Describe your project"
                                        value={project.desc}
                                        onChange={handleProjectChange}
                                        className={styles.formTextarea}
                                    />
                                    <label className={styles.formLabel}>Tech Used</label>
                                    <input
                                        type="text"
                                        name="tech"
                                        placeholder="Mention the technologies used"
                                        value={project.tech}
                                        onChange={handleProjectChange}
                                        className={styles.formInput}
                                    />
                                    <label className={styles.formLabel}>Project Image</label>
                                    <input
                                        name="projectImage"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleProjectImageChange}
                                        className={`${styles.formInput} ${styles.projimageInput}`}
                                    />
                                    <label className={styles.formLabel}>Preview Link</label>
                                    <input
                                        type="text"
                                        name="prevLink"
                                        placeholder="Paste the link of hosted project(if applicable)"
                                        value={project.prevLink}
                                        onChange={handleProjectChange}
                                        className={styles.formInput}
                                    />
                                    <label className={styles.formLabel}>Code Link</label>
                                    <input
                                        type="text"
                                        name="githubLink"
                                        placeholder="Paste the link to view code"
                                        value={project.githubLink}
                                        onChange={handleProjectChange}
                                        className={styles.formInput}
                                    />
                                    <button type="button" onClick={handleAddProject} className={styles.btnAdd}>Add Project</button>
                                </div>

                                {projects.slice().reverse().map((proj, index) => {
                                    const originalIndex = projects.length - 1 - index; // map back to original index
                                    return (
                                        <div key={originalIndex} className={styles.projectEntry}>
                                            <div className={styles.projName}>{proj.title}</div>
                                            <div className={styles.projDesc}>{proj.desc}</div>
                                            <div className={styles.projTech}>Tech Used: {proj.tech}</div>
                                            <div className={styles.projLink}>Preview: {proj.prevLink}</div>
                                            <div className={styles.projGithub}>Code: {proj.githubLink}</div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProject(originalIndex)}
                                                className={styles.btnDelete}
                                            >
                                                × Remove
                                            </button>
                                        </div>
                                    );
                                })}


                            </div>
                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <p className={styles.skipExp}>You can skip this if you are a fresher</p>
                            <div className={styles.expSection}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Orgaisation Name</label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Enter the name of organisation"
                                        value={experienceInput.company}
                                        onChange={handleExperienceChange}
                                        className={styles.formInput}
                                    />


                                    <label className={styles.formLabel}>Role</label>
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Enter your role in it"
                                        value={experienceInput.position}
                                        onChange={handleExperienceChange}
                                        className={styles.formInput}
                                    />

                                    <label className={styles.formLabel}>Start Date</label>
                                    <input
                                        type="text"
                                        name="from"
                                        placeholder="Enter the date of joining"
                                        value={experienceInput.from}
                                        onChange={handleExperienceChange}
                                        className={styles.formInput}
                                    />

                                    <label className={styles.formLabel}>End Date</label>
                                    <input
                                        type="text"
                                        name="to"
                                        placeholder="Enter the date till you worked"
                                        value={experienceInput.to}
                                        onChange={handleExperienceChange}
                                        className={styles.formInput}
                                    />
                                    <label className={styles.formLabel}>Work Description</label>
                                    <textarea
                                        name="work"
                                        placeholder="Tell something about your role (in sentences)"
                                        value={experienceInput.work}
                                        onChange={handleExperienceChange}
                                        className={styles.formTextarea}
                                    />

                                    <button type="button" onClick={handleAddExperience} className={styles.btnAdd}>Add Experience</button>
                                </div>
                                {experience.slice().reverse().map((exp, index) => (
                                    <div key={index} className={styles.projectEntry}>
                                        <div className={styles.projName}>{exp.company}</div>
                                        <div className={styles.expRole}>{exp.position}</div>
                                        <div className={styles.projDesc}>{exp.work}</div>
                                        <button type="button" onClick={() => handleRemoveExperience(index)} className={styles.btnDelete}>× Remove</button>
                                    </div>
                                ))}

                            </div>
                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <>
                            <div className={styles.connectSection}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Connect Section Description</label>
                                    <textarea
                                        name="connectDesc"
                                        onChange={handleConnectDescChange}
                                        value={connectDesc}
                                        className={styles.formTextarea}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Email</label>
                                    <input
                                        name="email"
                                        onChange={handleEmailChange}
                                        value={email}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>LinkedIn URL</label>
                                    <input
                                        name="linkedin"
                                        onChange={handleLinkedinChange}
                                        value={linkedin}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>GitHub URL</label>
                                    <input
                                        name="github"
                                        onChange={handleGithubChange}
                                        value={github}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.inputContainer}>
                                    <label className={styles.formLabel}>Twitter / X Profile</label>
                                    <input
                                        name="x"
                                        onChange={handlexChange}
                                        value={x}
                                        className={styles.formInput}
                                    />
                                </div>

                            </div>
                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? <>Generating Portfolio<span className={styles.dots}></span></> : "Finish"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </main>
        </>
    );
}

