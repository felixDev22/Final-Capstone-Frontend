import React, { useState } from 'react';
import twitter from '../../Assets/twitter.png';
import linkedin from '../../Assets/linkedin.png';
import github from '../../Assets/github.png';
import web from '../../Assets/web.png';
import {
  twitterLinks, linkedinLinks, githubLinks, webLinks,
} from './Data';

function SocialLinks() {
  const [showTwitterLinks, setShowTwitterLinks] = useState(false);
  const [showLinkedinLinks, setShowLinkedinLinks] = useState(false);
  const [showGithubLinks, setShowGithubLinks] = useState(false);
  const [showWebLinks, setShowWebLinks] = useState(false);

  const toggleTwitterLinks = () => {
    setShowTwitterLinks(!showTwitterLinks);
    setShowLinkedinLinks(false);
    setShowGithubLinks(false);
    setShowWebLinks(false);
  };

  const toggleLinkedinLinks = () => {
    setShowLinkedinLinks(!showLinkedinLinks);
    setShowTwitterLinks(false);
    setShowGithubLinks(false);
    setShowWebLinks(false);
  };

  const toggleGithubLinks = () => {
    setShowGithubLinks(!showGithubLinks);
    setShowTwitterLinks(false);
    setShowLinkedinLinks(false);
    setShowWebLinks(false);
  };

  const toggleWebLinks = () => {
    setShowWebLinks(!showWebLinks);
    setShowTwitterLinks(false);
    setShowLinkedinLinks(false);
    setShowGithubLinks(false);
  };

  return (
    <div className="social">
      <div className="socials-links">
        {showTwitterLinks && (
          <div className="social-links">
            <div className="links">
              <p>Twitter</p>
            </div>
            {twitterLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {showLinkedinLinks && (
          <div className="social-links">
            <div className="links">
              <p>Linkedin</p>
            </div>
            {linkedinLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {showGithubLinks && (
          <div className="social-links">
            <div className="links">
              <p>Github</p>
            </div>
            {githubLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {showWebLinks && (
          <div className="social-links">
            <div className="links">
              <p>Portfolio</p>
            </div>
            {webLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="socials">
        <div className="twitter-toggle" onClick={toggleTwitterLinks}>
          <img src={twitter} alt="social" />
        </div>
        <div className="linkedin-toggle" onClick={toggleLinkedinLinks}>
          <img src={linkedin} alt="social" />
        </div>
        <div className="github-toggle" onClick={toggleGithubLinks}>
          <img src={github} alt="social" />
        </div>
        <div className="web-toggle" onClick={toggleWebLinks}>
          <img src={web} alt="social" />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
