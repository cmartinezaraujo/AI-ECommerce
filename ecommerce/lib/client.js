import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'ht1jicpv',
    dataset: 'production',
    apiVersion: '2022-09-28',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank to be anonymous user
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);