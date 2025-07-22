import HeaderClient from './headerclient';
import { PreprSdk } from '@/server/prepr';

export default async function HeaderServer() {
  const { MenuItem } = await PreprSdk.NavBlog();

  return <HeaderClient menuItem={MenuItem} />;
}