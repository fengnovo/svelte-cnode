import Home from '../pages/Home/index.svelte';
import Detail from '../pages/Detail/index.svelte';
import User from '../pages/User/index.svelte';
import Login from '../pages/Login/index.svelte';
import Publish from '../pages/Publish/index.svelte';

const route = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/user/:id': User,
  '/login': Login,
  '/publish': Publish
}

export default route
