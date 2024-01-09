import DonationAlerts from '@/assets/integrations/donationalerts.svg?component';
import Faceit from '@/assets/integrations/faceit.svg?component';
import LastFm from '@/assets/integrations/lastfm.svg?component';
import OBS from '@/assets/integrations/obs.svg?component';
import Spotify from '@/assets/integrations/spotify.svg?component';
// import StreamElements from '@/assets/integrations/streamelements.svg?component';
import Streamlabs from '@/assets/integrations/streamlabs.svg?component';
import Twitch from '@/assets/integrations/twitch.svg?component';
import Vk from '@/assets/integrations/vk.svg?component';

interface Integration {
	icon: any;
	label: string;
	href: string;
}

export const integrations: Integration[] = [
  {
		icon: DonationAlerts,
		label: 'DonationAlerts',
		href: 'https://donationalerts.com',
	},
  {
		icon: Faceit,
		label: 'FaceIt',
		href: 'https://faceit.com',
	},
  {
		icon: OBS,
		label: 'OBS',
		href: 'https://obsproject.com',
	},
  {
		icon: Spotify,
		label: 'Spotify',
		href: 'https://spotify.com',
	},
  // {
	// 	icon: StreamElements,
	// 	label: 'Stream Elements',
	// 	href: 'https://streamelements.com',
	// },
  {
		icon: Streamlabs,
		label: 'Streamlabs',
		href: 'https://streamlabs.com',
	},
  {
		icon: Twitch,
		label: 'Twitch',
		href: 'https://twitch.tv',
	},
  {
		icon: Vk,
		label: 'VK',
		href: 'https://vk.com',
	},
  {
		icon: LastFm,
		label: 'LastFM',
		href: 'https://last.fm',
	},
];
