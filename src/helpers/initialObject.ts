import type { LayoutItem } from '@/types/layouts'
import { ostrovImage, floraImage, sunwearImage } from '@/helpers/imagesBase64Format'

export const layoutList: LayoutItem[] = [
  {
    id: 1,
    number: '100',
    name: 'Ostrov',
    url: 'https://design100.horoshop.ua/',
    images: [
      `${ostrovImage}`,
      `${floraImage}`,
      `${sunwearImage}`
    ],
    isPublished: true
  },
  {
    id: 2,
    number: '101',
    name: 'Flora',
    url: 'https://design101.horoshop.ua/',
    images: [
      `${floraImage}`,
      `${sunwearImage}`,
      `${ostrovImage}`
    ],
    isPublished: false
  },
  {
    id: 3,
    number: '102',
    name: 'SunWear',
    url: 'https://design102.horoshop.ua/',
    images: [
      `${sunwearImage}`,
      `${floraImage}`,
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 4,
    number: '103',
    name: 'Flora',
    url: 'https://design103.horoshop.ua/',
    images: [
      `${floraImage}`,
      `${sunwearImage}`,
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 5,
    number: '104',
    name: 'Flora',
    url: 'https://design104.horoshop.ua/',
    images: [
      `${floraImage}`,
      `${sunwearImage}`,
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 6,
    number: '105',
    name: 'SunWear',
    url: 'https://design105.horoshop.ua/',
    images: [
      `${sunwearImage}`,
      `${floraImage}`,
      `${ostrovImage}`
    ],
    isPublished: true
  },
  {
    id: 7,
    number: '106',
    name: 'Ostrov',
    url: 'https://design106.horoshop.ua/',
    images: [
      `${ostrovImage}`,
      `${sunwearImage}`,
      `${floraImage}`
    ],
    isPublished: true
  },
  {
    id: 8,
    number: '107',
    name: 'SunWear',
    url: 'https://design107.horoshop.ua/',
    images: [
    ],
    isPublished: true
  }
]