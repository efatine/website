export interface Component {
  type: string
  name: string
  href: string
}

export const ComponentData: Component[] = [
  {
    type: 'Case: ',
    name: 'NZXT H9 Elite',
    href: 'https://nzxt.com/product/h9-elite',
  },
  {
    type: 'Motherboard: ',
    name: 'MSI MPG Z790 EDGE WIFI',
    href: 'https://www.msi.com/Motherboard/MPG-Z790-EDGE-WIFI',
  },
  {
    type: 'PSU: ',
    name: 'Corsair HX Series™ HX1200 — 1200W',
    href: 'https://www.corsair.com/ca/en/Categories/Products/Power-Supply-Units/hxi-series-2017-config/p/CP-9020140-UK',
  },
  {
    type: 'GPU: ',
    name: 'NVIDIA Geforce RTX 4090 Founders Edition',
    href: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/',
  },
  {
    type: 'CPU: ',
    name: 'Intel® Core™ i9-13900KS',
    href: 'https://www.intel.com/content/www/us/en/products/sku/232167/intel-core-i913900ks-processor-36m-cache-up-to-6-00-ghz/specifications.html',
  },
  {
    type: 'CPU Cooler: ',
    name: 'NZXT Kraken Z73 RGB',
    href: 'https://nzxt.com/en-CA/product/kraken-z73-rgb',
  },
  {
    type: 'Memory: ',
    name: 'Corsair Vengeance RGB 32GB DDR5-6200',
    href: 'https://www.corsair.com/us/en/p/memory/cmh32gx5m2b6200c36w/vengeance-rgb-32gb-2x16gb-ddr5-dram-6200mhz-c36-memory-kit-white-cmh32gx5m2b6200c36w',
  },
  {
    type: 'Storage: ',
    name: '4TB WD_BLACK SN850X NVMe™ SSD',
    href: 'https://westerndigital.com/en-ca/products/internal-drives/wd-black-sn850x-nvme-ssd?sku=WDS400T2X0E',
  },
]
