// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Derive GitHub Pages site and base at build time (works locally and on CI)
const repository = process.env.GITHUB_REPOSITORY;
const [repoOwner, repoName] = repository ? repository.split('/') : [];
const isUserOrOrgPages = repoOwner && repoName && repoName.toLowerCase() === `${repoOwner.toLowerCase()}.github.io`;
const site = repoOwner ? `https://${repoOwner}.github.io` : undefined;
const base = repoOwner ? (isUserOrOrgPages ? '/' : `/${repoName}/`) : '/';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
