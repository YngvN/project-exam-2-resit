import React from "react";

function Home() {
    return (
        <div>
            <header>
                <h1>Main Heading (H1)</h1>
                <p>This is an introductory paragraph providing context for the content below.</p>
            </header>

            <main>
                <section>
                    <h2>Subheading Level 1 (H2)</h2>
                    <p>
                        This is a standard paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus bibendum vehicula nunc, at faucibus lacus tempor nec.
                    </p>
                    <blockquote>
                        "This is a blockquote element. It's typically used for emphasizing quoted content."
                        <footer>— Author Name</footer>
                    </blockquote>
                </section>

                <section>
                    <h3>Subheading Level 2 (H3)</h3>
                    <ul>
                        <li>Unordered list item 1</li>
                        <li>Unordered list item 2</li>
                        <li>Unordered list item 3</li>
                    </ul>
                    <ol>
                        <li>Ordered list item 1</li>
                        <li>Ordered list item 2</li>
                        <li>Ordered list item 3</li>
                    </ol>
                </section>

                <section>
                    <h4>Subheading Level 3 (H4)</h4>
                    <p>
                        <strong>Bold text:</strong> This text is bolded for emphasis.
                        <em>Italic text:</em> This text is italicized for subtle emphasis.
                    </p>
                    <p>
                        <a href="#">This is a hyperlink</a>, styled to indicate clickable text.
                    </p>
                </section>
            </main>

            <footer>
                <p>Footer text © 2025. All rights reserved.</p>
            </footer>
        </div >

    );
}

export default Home;