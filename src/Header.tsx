import classes from './Header.module.css';

export const Header = (props: any) => {

    return (
        <section className={classes.header}>
                <div>
                    <ul>
                        <li><h2>David&apos;s Tradie App</h2></li>
                        <li><a href="https://github.com/biggie9925">Github</a></li>
                        <li><a href="https://www.linkedin.com/in/david-mackey-ward">LinkedIn</a></li>
                    </ul>
                </div>
        </section>
    );
}

export default Header;
