import { router } from './router.service';
import './shared/styles.css';

router(window.location.hash)
window.addEventListener('hashchange', () => {
    router(window.location.hash)
})

