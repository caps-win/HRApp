import { router } from './router.service';
import './shared/styles.css';

router(window.location.hash)
window.addEventListener('hashchange', () => {
    console.log()
    router(window.location.hash)
})

console.log(process.env.API_KEY)