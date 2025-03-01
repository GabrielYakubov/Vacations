import React, { FC } from "react";
import styles from "./About.module.scss";

interface AboutProps {}

const About: FC<AboutProps> = () => {
  return (
    <div className={styles.About}>
        <div className={styles.About__content}>
                <h2>
                Explore Your Dream Destinations - Unravel the World with Our Vacation
                Platform.
            </h2>

            <h4>
                Introduction: Welcome to our cutting-edge web application that empowers
                users to explore and discover their dream vacations effortlessly. Our
                platform is designed with the latest technologies and user-friendly
                features to ensure a seamless browsing experience for all travel
                enthusiasts. Whether you're seeking upcoming adventures, active
                itineraries, or vacations loved by fellow users, our filtering system
                makes finding your ideal getaway a breeze. Not only that, but
                administrators also have access to powerful tools to manage vacations,
                monitor followers' statistics, and export data for analytical purposes.
            </h4>

            <ul>
                <li>
                <strong>User-Centric Vacation Browsing:</strong> Our web application
                is built using React, Node.js, and MySQL, offering a visually
                appealing and responsive user interface. The intuitive design ensures
                that users can effortlessly search and explore vacations from a vast
                collection of destinations.
                </li>
                <li>
                <strong>Advanced Filtering Options:</strong> We understand that
                everyone has unique preferences when it comes to vacations. To cater
                to these varying interests, we have implemented advanced filtering
                options that allow users to find vacations based on their upcoming
                schedules, currently active destinations, and even vacations they have
                liked. This empowers our users to tailor their vacation choices to
                their specific desires.
                </li>
                <li>
                <strong>Admin Privileges for Vacation Management:</strong>
                Administrators have full control over the platform and can
                effortlessly manage vacations. The admin dashboard provides options to
                add new vacations, edit existing ones, and remove outdated listings.
                This ensures that our platform stays up-to-date with the latest and
                most exciting travel opportunities.
                </li>
                <li>
                <strong>Data-Driven Decision Making:</strong> We believe in
                data-driven insights for continual improvement. Our admin dashboard
                offers a comprehensive chart that provides valuable information about
                the popularity of vacations. It displays the number of followers for
                each vacation, helping administrators identify trending destinations
                and gauge user preferences accurately.
                </li>
                <li>
                <strong>Exportable Data for In-Depth Analysis:</strong> In addition to
                the visual representation of vacation popularity, the admin dashboard
                allows administrators to download the data as a CSV file. This feature
                enables them to perform in-depth analysis using spreadsheet tools,
                extract valuable trends, and make informed decisions to enhance user
                experience.
                </li>
            </ul>
            <h5>
                Conclusion: At our web application, we are committed to providing users
                with a one-stop platform to explore their dream vacations effortlessly.
                With our user-centric design, powerful filtering options, and
                data-driven insights, we aim to deliver an exceptional experience for
                both users and administrators alike. Join us now and embark on a journey
                to unravel the world's most captivating destinations!
            </h5>
        </div>
    </div>
  );
};

export default About;
