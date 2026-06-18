import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">

      {/* Header */}
      <section className="about-hero">
        <div className="about-hero__img-col">
          <img
            src="/uploads/IMG_20260601_140151.jpg"
            alt="Studio"
          />
        </div>
        <div className="about-hero__text">
          <p className="section-label">About the maker</p>
          <h1>Painting is how<br /><em>I think out loud</em></h1>
          <div className="ink-divider-sm" style={{margin:'1.25rem 0', marginLeft:0}} />
          <p>
            My name doesn't matter as much as the paintings. But I'll tell you a little —
            I live in Erode, Tamil Nadu. I've been making things with my hands since before I
            knew what to call it. Now I call it painting.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story container">
        <div className="about-story__inner">

          <div className="about-story__block">
            <span className="about-story__number">I.</span>
            <div>
              <h3>How it started</h3>
              <p>
                I began painting seriously during a long, quiet season — the kind of time that arrives
                without warning and asks you to slow down. I had a notebook, some watercolours from a
                stationery shop, and a window that got the morning light. That was enough.
              </p>
              <p>
                The first paintings were small — studies of things on my desk, plants that had grown
                straggly in their pots, the texture of a wall I kept staring at. I wasn't trying to
                make art. I was trying to pay attention.
              </p>
            </div>
          </div>

          <div className="about-story__divider">
            <span>✦</span>
          </div>

          <div className="about-story__block">
            <span className="about-story__number">II.</span>
            <div>
              <h3>The way I work</h3>
              <p>
                I work in several mediums — watercolour, gouache, oil, and sometimes mixed media
                when a painting asks for something I can't give it with one material. My studio is
                a corner of a room. My hours are early. I prefer the work to be small — not out of
                limitation, but because small things ask for close looking.
              </p>
              <p>
                I am not interested in speed. Every painting I make is an original. I don't produce
                multiples or editions unless someone asks specifically, and even then I'll tell you
                if I think the piece doesn't lend itself to it.
              </p>
            </div>
          </div>

          <div className="about-story__divider">
            <span>✦</span>
          </div>

          <div className="about-story__block">
            <span className="about-story__number">III.</span>
            <div>
              <h3>What I believe about art</h3>
              <p>
                I believe art is made for specific people, specific walls, specific rooms. When
                someone buys a painting from me, I think of it as a long conversation — the painting
                was made in one silence, and now it will live in another. That's a kind of connection
                I find deeply meaningful.
              </p>
              <p>
                I also believe in showing the process. I share work-in-progress, thoughts, and
                studio life on my YouTube channel — not as performance, but because the making
                is as true as the made thing.
              </p>
            </div>
          </div>

        </div>

        {/* Studio images */}
        <div className="about-images">
          <img src="/uploads/IMG20260507133026.jpg" alt="Paints" />
          <img src="/uploads/IMG20260515132044.jpg" alt="Brushes" />
          <img src="/uploads/IMG20260531203456.jpg" alt="Work in progress" />
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <p className="section-label">What I offer</p>
            <h2>Ways to work together</h2>
          </div>
          <div className="about-values__grid">
            <div className="about-value-card">
              <span className="about-value-card__icon">❧</span>
              <h4>Original paintings</h4>
              <p>Works available in the gallery are one-of-a-kind originals. Once sold, they are gone.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-card__icon">❧</span>
              <h4>Commissions</h4>
              <p>I take a small number of commissions each year. Write to me with what you have in mind.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-card__icon">❧</span>
              <h4>Prints on request</h4>
              <p>Some works are available as prints. Ask me — I'll tell you honestly whether a print does the piece justice.</p>
            </div>
            <div className="about-value-card">
              <span className="about-value-card__icon">❧</span>
              <h4>YouTube studio diary</h4>
              <p>I share my process, failures, and small discoveries on my channel. A window into the work.</p>
            </div>
          </div>
          <div style={{textAlign:'center', marginTop:'3rem', display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
            <Link to="/gallery" className="btn-primary">Browse the Gallery</Link>
            <Link to="/contact" className="btn-ghost">Get in touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
