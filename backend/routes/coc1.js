const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Initialize COC 1 with all computer types and operating system basics
router.get('/initialize', async (req, res) => {
  try {
    // Step 1: Add missing columns if they don't exist
    await pool.query(
      'ALTER TABLE coc1_terms ADD COLUMN IF NOT EXISTS abbreviation VARCHAR(50)'
    );
    await pool.query(
      'ALTER TABLE coc1_terms ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)'
    );

    // Step 2: Define all terms to insert (Types of Computer + Operating System Basics)
    const allTerms = [
      // Types of Computer
      {
        name: 'Super Computer',
        abbreviation: null,
        definition: 'The most powerful type of computer, used for complex tasks like scientific research and space exploration. NASA uses it for launching and controlling space missions.',
        category: 'Types of Computer',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763851860/supercomputer_fiucix.png'
      },
      {
        name: 'Mainframe Computer',
        abbreviation: null,
        definition: 'A large, expensive computer used by big companies to process and store massive amounts of data.',
        category: 'Types of Computer',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763853341/mainframe_ra732v.png'
      },
      {
        name: 'Early Mainframe Computer (NEAC 2203)',
        abbreviation: null,
        definition: 'This was an early transistorized mainframe known for handling Japan\'s first real-time railway reservation system in 1960.',
        category: 'Types of Computer',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763853482/earlymainframe_trgjm7.png'
      },
      {
        name: 'Mini Computer',
        abbreviation: null,
        definition: 'In other term, midrange computer, is used by departments in organizations for shared tasks and moderate data processing.',
        category: 'Types of Computer',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763853558/minicom_ccrhua.png'
      },
      {
        name: 'Micro Computer',
        abbreviation: null,
        definition: 'This type of computer includes desktops, laptops, and phones. It is the most affordable type, designed for personal use like work, entertainment, and education.',
        category: 'Types of Computer',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763853650/microcom_pagp7n.png'
      },
      // Operating System Basics
      {
        name: 'Operating System',
        abbreviation: 'OS',
        definition: 'The software that manages a computer\'s hardware and software resources, provides a user interface, and allows you to run applications and control the overall operation of the computer.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Desktop Operating System',
        abbreviation: null,
        definition: 'A type of operating system designed for personal computers and laptops, featuring a user-friendly interface and tools that let users run applications, manage files, and interact directly with the computer.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Network Operating System',
        abbreviation: 'NOS',
        definition: 'A type of operating system designed to manage and coordinate multiple computers connected in a network, providing shared resources, security, and communication between devices.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Microsoft Windows',
        abbreviation: null,
        definition: 'An operating system known for its user-friendly interface, wide software compatibility, and strong support, allowing users to easily run programs and manage files.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Linux',
        abbreviation: null,
        definition: 'An open-source operating system known for its stability and flexibility, allowing users to run applications, manage files, and customize the system.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'MacOS',
        abbreviation: null,
        definition: 'An operating system developed by Apple, known for its sleek interface, strong security, and seamless integration with other Apple devices.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Command-line Interface',
        abbreviation: 'CLI',
        definition: 'A system where users type commands to control the computer and run programs.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Graphical User Interface',
        abbreviation: 'GUI',
        definition: 'A system where users interact with the computer using visual elements like icons and menus to run programs and manage tasks.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Multiuser',
        abbreviation: null,
        definition: 'Refers to a system that allows multiple users to access and use the computer\'s resources simultaneously.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Multitasking',
        abbreviation: null,
        definition: 'Refers to an operating system\'s ability to run multiple tasks or programs at the same time.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Multiprocessing',
        abbreviation: null,
        definition: 'Refers to a system using two or more processors to execute programs simultaneously.',
        category: 'Operating System Basics',
        image: null
      },
      {
        name: 'Multithreading',
        abbreviation: null,
        definition: 'Refers to a program\'s ability to execute multiple threads (smaller units of a process) at the same time for better efficiency.',
        category: 'Operating System Basics',
        image: null
      },
      // Computer Software and Language
      {
        name: 'Computer Software',
        abbreviation: null,
        definition: 'A set of programs that tells a computer how to perform tasks. It includes system software, which runs the computer, and application software, which helps users complete specific tasks.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'System Software',
        abbreviation: null,
        definition: 'A type of computer program that manages and controls the computer hardware, allowing the system and application software to run.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Application Software',
        abbreviation: null,
        definition: 'A program that helps users perform specific tasks on a computer such as writing a letter. It is designed for practical use by end users rather than for running the computer itself.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Word Processing',
        abbreviation: null,
        definition: 'An application software that allows users to create, edit, format, and print text documents. It is used for writing letters, reports, and other written materials.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Desktop Publishing',
        abbreviation: null,
        definition: 'An application software that enables users to design and produce professional-looking publications. It allows combining text and images with precise layout control.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Data Handling',
        abbreviation: null,
        definition: 'An application software that manages, organizes, and analyzes data stored in databases. It is used for creating, editing, sorting, and searching records, and displaying information in charts or tables.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Spreadsheet Modelling',
        abbreviation: null,
        definition: 'An application software that allows users to perform calculations, create financial models, or run simulations using rows, columns, and formulas. It is used for producing invoices, cost plans, and other data-driven models.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Graphics Package',
        abbreviation: null,
        definition: 'An application software that enables users to create, edit, and manipulate images and drawings. It is used for digital painting, photo editing, and graphic design.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Computer-Aided Design',
        abbreviation: 'CAD',
        definition: 'An application software that helps users design products, floor plans, or 3D models accurately. It is used for engineering, architecture, and technical drawing.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Presentation Software',
        abbreviation: null,
        definition: 'An application software that allows users to create multimedia presentations using text, images, video, and sound. It is used for lectures, demonstrations, and business presentations.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Music Software',
        abbreviation: null,
        definition: 'An application software that allows users to compose, record, edit, and play musical performances. It is used for creating digital music and audio production.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Packaged Software',
        abbreviation: null,
        definition: 'A form of application software that includes multiple programs bundled together, used to perform similar tasks efficiently and often more cost-effectively than buying programs individually.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Custom Software',
        abbreviation: null,
        definition: 'A form of application software designed specifically for an individual or organization to perform tasks tailored to their unique needs.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Web Application',
        abbreviation: null,
        definition: 'A form of application software that runs through an internet browser, allowing user interaction and access to features without needing local installation.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Open-source Software',
        abbreviation: null,
        definition: 'A form of application software whose source code is publicly available, allowing anyone to study, modify, and distribute it, promoting collaboration and transparency.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Shareware Software',
        abbreviation: null,
        definition: 'A form of application software initially provided for free, allowing users to try and share the program before purchasing the full version.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Freeware Software',
        abbreviation: null,
        definition: 'A form of application software that is available at no cost to the user, though usually with restrictions on modification, redistribution, or reverse engineering.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Public Domain Software',
        abbreviation: null,
        definition: 'A form of application software that has no ownership restrictions, allowing anyone to freely use, modify, distribute, or sell it.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Programming Languages',
        abbreviation: null,
        definition: 'Languages that are used to write instructions that tell a computer how to perform tasks, forming the foundation for all software development.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'Low-level Languages',
        abbreviation: null,
        definition: 'A type of programming language that interacts closely with the computer\'s hardware, used to create programs that run efficiently and quickly.',
        category: 'Computer Software and Language',
        image: null
      },
      {
        name: 'High-level Languages',
        abbreviation: null,
        definition: 'A type of programming language designed to be easy for humans to read, write, and debug, used to create programs that can run on different computers.',
        category: 'Computer Software and Language',
        image: null
      },
      // Computer System, Computer Case & Form Factors
      {
        name: 'Computer System',
        abbreviation: null,
        definition: 'A complete set of hardware and software that work together to identify, access, and process information.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'Hardware',
        abbreviation: null,
        definition: 'The physical parts of a computer such as case, drives, keyboard, monitor, cables, speakers, and printer.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'Software',
        abbreviation: null,
        definition: 'The operating system and programs that instruct the computer how to operate.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'Computer Case',
        abbreviation: null,
        definition: 'The enclosure that holds and protects internal parts and keeps them cool using vents and fans.',
        category: 'Computer System, Computer Case & Form Factors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763855790/computercase_lju3iv.png'
      },
      {
        name: 'Form Factor',
        abbreviation: null,
        definition: 'The size, layout, and design of a computer case or motherboard.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'ATX',
        abbreviation: null,
        definition: 'The most common form factor, created by Intel, updated to improve airflow.',
        category: 'Computer System, Computer Case & Form Factors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763855859/standardATX_kqga5u.png'
      },
      {
        name: 'AT',
        abbreviation: null,
        definition: 'An older motherboard/case form factor.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'Micro-ATX',
        abbreviation: null,
        definition: 'A smaller ATX form designed for compact systems.',
        category: 'Computer System, Computer Case & Form Factors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763855915/microATX_pxugga.png'
      },
      {
        name: 'LPX',
        abbreviation: null,
        definition: 'A low-profile form factor.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'NLX',
        abbreviation: null,
        definition: 'A newer low-profile form factor with different layout.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      {
        name: 'BTX',
        abbreviation: null,
        definition: 'A form factor designed to improve airflow and cooling.',
        category: 'Computer System, Computer Case & Form Factors',
        image: null
      },
      // Power Supply & Connectors
      {
        name: 'Power Supply',
        abbreviation: 'PSU',
        definition: 'Converts AC from the outlet to DC power needed by computer components.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763855975/psu_vlo2aw.png'
      },
      {
        name: 'ATX 24-pin Connector',
        abbreviation: null,
        definition: 'Main power connector for most motherboards.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856039/atx24pin_tkvqmh.png'
      },
      {
        name: 'ATX 20-pin',
        abbreviation: null,
        definition: 'An older main power connector.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856091/atx20pin_r7ymox.png'
      },
      {
        name: 'ATX12V 4-pin',
        abbreviation: null,
        definition: 'Supplies +12V power to the CPU area.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856211/atx12v_ivd1ez.png'
      },
      {
        name: 'ATX 6-pin',
        abbreviation: null,
        definition: 'Provides +12V for processor voltage regulators.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856309/atx6pin_j8im2t.png'
      },
      {
        name: 'SATA Power Connector',
        abbreviation: null,
        definition: 'Powers SATA hard drives and optical drives.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856320/sata_k3wdbg.png'
      },
      {
        name: 'Molex 4-pin',
        abbreviation: null,
        definition: 'Powers older PATA drives and some internal peripherals.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856408/molex4pin_yf2wcp.png'
      },
      {
        name: 'Berg Connector',
        abbreviation: null,
        definition: 'Power connector for floppy drives.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856414/bergcon_kbm663.png'
      },
      {
        name: 'P8/P9 (AT)',
        abbreviation: null,
        definition: 'Older AT motherboard power connectors.',
        category: 'Power Supply & Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856423/p8p9_exmoqi.png'
      },
      // Parts of the Motherboard
      {
        name: 'Motherboard',
        abbreviation: null,
        definition: 'The main circuit board containing CPU socket, RAM slots, chipset, connectors, ports, and buses.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856535/motherboard_esyavb.png'
      },
      {
        name: 'Chipset',
        abbreviation: null,
        definition: 'Controls how the CPU communicates with memory, video, and other devices.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856543/chipset_kugde4.png'
      },
      {
        name: 'Northbridge',
        abbreviation: null,
        definition: 'Manages communication between CPU, RAM, and video card.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856595/north_kgne3s.png'
      },
      {
        name: 'Southbridge',
        abbreviation: null,
        definition: 'Manages communication with drives, USB, sound, and I/O ports.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856666/south_lptiub.png'
      },
      {
        name: 'SATA Ports',
        abbreviation: null,
        definition: 'Connect storage devices to the motherboard.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856653/sataports_hycv52.png'
      },
      {
        name: 'Expansion Slots',
        abbreviation: null,
        definition: 'Slots for video cards, network cards, and other adapters.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763856727/expansion_lleevz.png'
      },
      // Additional Motherboard Components
      {
        name: 'BIOS Chip',
        abbreviation: null,
        definition: 'Stores startup instructions needed to boot the system.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857265/bios_lquxut.png'
      },
      {
        name: 'Internal & External Connectors',
        abbreviation: null,
        definition: 'Allow power, data, and devices to connect to the motherboard.',
        category: 'Parts of the Motherboard',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857300/internal_cs64yd.png'
      },
      {
        name: 'CPU Socket',
        abbreviation: null,
        definition: 'The slot on the motherboard where the processor is installed.',
        category: 'Parts of the Motherboard',
        image: null
      },
      // Cooling System and Expansion Cards
      {
        name: 'CPU / Processor',
        abbreviation: null,
        definition: 'The component that performs most of the data processing and instruction execution.',
        category: 'Cooling System and Expansion Cards',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857256/cpu_gz0ecw.png'
      },
      {
        name: 'Heat Sink',
        abbreviation: null,
        definition: 'Metal fins that draw heat away from the CPU.',
        category: 'Cooling System and Expansion Cards',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857377/heat_rw3wdy.png'
      },
      {
        name: 'CPU Fan',
        abbreviation: null,
        definition: 'A fan installed on top of the heat sink to keep the processor cool.',
        category: 'Cooling System and Expansion Cards',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857383/fan_gnostl.png'
      },
      {
        name: 'Processor Cooler',
        abbreviation: null,
        definition: 'The heat sink and fan combined.',
        category: 'Cooling System and Expansion Cards',
        image: null
      },
      {
        name: 'Expansion Card',
        abbreviation: null,
        definition: 'A board that adds more ports or functions not built into the motherboard.',
        category: 'Cooling System and Expansion Cards',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857461/card_qkvtdo.png'
      },
      {
        name: 'Video Card',
        abbreviation: null,
        definition: 'An expansion card that handles video output and may include its own cooling.',
        category: 'Cooling System and Expansion Cards',
        image: null
      },
      {
        name: 'Sound Card',
        abbreviation: null,
        definition: 'An expansion card for audio input and output.',
        category: 'Cooling System and Expansion Cards',
        image: null
      },
      {
        name: 'LAN Card',
        abbreviation: null,
        definition: 'A card that allows network connectivity.',
        category: 'Cooling System and Expansion Cards',
        image: null
      },
      // ROM Types
      {
        name: 'ROM',
        abbreviation: 'Read-Only Memory',
        definition: 'Stores permanent boot instructions that cannot be rewritten normally.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857538/ROM_hqajvd.png'
      },
      {
        name: 'PROM',
        abbreviation: 'Programmable Read-Only Memory',
        definition: 'ROM that can be written once after manufacturing.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'EPROM',
        abbreviation: 'Erasable Programmable Read-Only Memory',
        definition: 'ROM that can be erased with UV light and rewritten.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'EEPROM / Flash ROM',
        abbreviation: 'Electrically Erasable Programmable Read-Only Memory',
        definition: 'ROM that can be erased and rewritten electronically.',
        category: 'Memory & Storage Devices',
        image: null
      },
      // RAM Types
      {
        name: 'RAM',
        abbreviation: 'Random Access Memory',
        definition: 'Temporary memory that stores data the CPU is currently using; erased when powered off.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857626/RAM_ahst35.png'
      },
      {
        name: 'DRAM',
        abbreviation: 'Dynamic Random Access Memory',
        definition: 'Main memory that must be constantly refreshed.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'SRAM',
        abbreviation: 'Static Random Access Memory',
        definition: 'Faster memory used for cache; doesn\'t need frequent refreshing.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'FPM DRAM',
        abbreviation: 'Fast Page Mode DRAM',
        definition: 'Older RAM supporting paging for faster access.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'EDO RAM',
        abbreviation: 'Extended Data Out RAM',
        definition: 'RAM that overlaps data accesses for faster performance.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'SDRAM',
        abbreviation: 'Synchronous Dynamic Random Access Memory',
        definition: 'DRAM synchronized with the memory bus speed.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'DDR SDRAM',
        abbreviation: 'Double Data Rate SDRAM',
        definition: 'Transfers data twice per cycle for higher speed.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'DDR2 SDRAM',
        abbreviation: 'Double Data Rate 2 SDRAM',
        definition: 'Faster and with less signal noise than DDR.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'RDRAM',
        abbreviation: 'Rambus Dynamic Random Access Memory',
        definition: 'Very high-speed memory, rarely used today.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'DDR4 SDRAM',
        abbreviation: 'Double Data Rate 4 SDRAM',
        definition: 'A modern, high-speed RAM type not compatible with earlier versions.',
        category: 'Memory & Storage Devices',
        image: null
      },
      // Memory Modules
      {
        name: 'DIP',
        abbreviation: 'Dual In-line Package',
        definition: 'Early individual memory chips with two rows of pins.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'SIMM',
        abbreviation: 'Single In-line Memory Module',
        definition: 'Small memory board with multiple chips; 30-pin or 72-pin.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'DIMM',
        abbreviation: 'Dual In-line Memory Module',
        definition: 'Main memory module for SDRAM, DDR, DDR2; has 168, 184, or 240 pins.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'RIMM',
        abbreviation: 'Rambus In-line Memory Module',
        definition: 'Memory module for RDRAM chips.',
        category: 'Memory & Storage Devices',
        image: null
      },
      // Cache Memory
      {
        name: 'L1 Cache',
        abbreviation: null,
        definition: 'Cache built inside the CPU, fastest access.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'L2 Cache',
        abbreviation: null,
        definition: 'Cache originally on motherboard; now inside CPU.',
        category: 'Memory & Storage Devices',
        image: null
      },
      {
        name: 'L3 Cache',
        abbreviation: null,
        definition: 'Larger cache for high-end CPUs and servers.',
        category: 'Memory & Storage Devices',
        image: null
      },
      // Storage Devices
      {
        name: 'Hard Disk Drive',
        abbreviation: 'HDD',
        definition: 'Permanent storage for the operating system, programs, and files.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857703/hdd_mw68ov.png'
      },
      {
        name: 'Optical Drive',
        abbreviation: null,
        definition: 'Reads or writes CDs, DVDs, or Blu-ray discs.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857714/od_wsi506.png'
      },
      {
        name: 'Tape Drive',
        abbreviation: null,
        definition: 'Used for backup and large data storage.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857763/tape_wkt70e.png'
      },
      {
        name: 'Floppy Drive',
        abbreviation: null,
        definition: 'Older storage device using floppy disks.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857808/flappy_d2zh54.png'
      },
      {
        name: 'Drive Bays',
        abbreviation: null,
        definition: 'Slots in the case where drives are installed.',
        category: 'Memory & Storage Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763857894/drivebays_k8qx8i.png'
      },
      // Drive Cables & Port Connectors
      {
        name: 'SATA Cable',
        abbreviation: null,
        definition: 'A narrow cable for data transfer between motherboard and SATA drives.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858025/satacable_jufeur.png'
      },
      {
        name: 'SATA Power Cable',
        abbreviation: null,
        definition: 'Powers SATA drives.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858203/satapowercable_xvaudp.png'
      },
      {
        name: 'PATA/IDE Cable',
        abbreviation: null,
        definition: 'Wide ribbon cable for older drives.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858237/pata_civiqj.png'
      },
      {
        name: 'eSATA',
        abbreviation: 'External SATA',
        definition: 'External SATA port for high-speed storage devices.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858342/esata_fadzm9.png'
      },
      {
        name: 'Parallel Port',
        abbreviation: null,
        definition: '25-pin port once used for older printers.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858372/parallel_scyod2.png'
      },
      {
        name: 'Modem Port / RJ-11',
        abbreviation: null,
        definition: 'Connects dial-up phone lines.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858488/modem_iin0cn.png'
      },
      {
        name: 'VGA Port',
        abbreviation: null,
        definition: '15-pin port for analog video signals.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858504/VGAPORT_yxmxh2.png'
      },
      {
        name: 'S-Video Port',
        abbreviation: null,
        definition: 'Round port used to connect to TVs.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858537/svid_ysbkr9.png'
      },
      {
        name: 'DVI Port',
        abbreviation: null,
        definition: 'Sends analog or digital video (DVI-I, DVI-D, DVI-A).',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858635/dviport_bqkqot.png'
      },
      {
        name: 'HDMI Port',
        abbreviation: null,
        definition: 'Sends digital video and audio.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858647/hdmiport_mdinwr.png'
      },
      {
        name: 'DisplayPort',
        abbreviation: null,
        definition: 'Digital video/audio port replacing VGA and DVI.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858679/displayport_jf8o8u.png'
      },
      {
        name: 'Thunderbolt Port',
        abbreviation: null,
        definition: 'Sends video and data through one port, compatible with DisplayPort.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858778/thunder_w02wz0.png'
      },
      {
        name: 'Audio Ports',
        abbreviation: null,
        definition: 'Ports for microphone, audio-in, and audio-out.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763858821/audio_tjqprl.png'
      },
      {
        name: 'S/PDIF',
        abbreviation: null,
        definition: 'Port for high-quality digital audio output.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859003/spdif_yr5xqc.png'
      },
      {
        name: 'USB Port',
        abbreviation: null,
        definition: 'Multipurpose port for many devices; USB 2.0 and 3.0 have different speeds.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859129/usbport_viwdow.png'
      },
      {
        name: 'FireWire / IEEE 1394',
        abbreviation: null,
        definition: 'High-speed port for multimedia devices like camcorders.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859207/fireware_mxk51w.png'
      },
      {
        name: 'eSATA Port',
        abbreviation: null,
        definition: 'Port for external SATA storage devices.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859220/esataport_frhpmh.png'
      },
      {
        name: 'PS/2 Port',
        abbreviation: null,
        definition: '6-pin round port for keyboard and mouse.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859273/ps2port_d0q6jq.png'
      },
      {
        name: 'Serial Port / DB9',
        abbreviation: null,
        definition: '9-pin port used on older computers.',
        category: 'Drive Cables & Port Connectors',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859331/serial_port_dplgl5.png'
      },
      // Input & Output Devices
      {
        name: 'Keyboard',
        abbreviation: null,
        definition: 'Enters text and commands.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859423/keyboard_ee9yxr.png'
      },
      {
        name: 'Mouse',
        abbreviation: null,
        definition: 'Navigates the graphical user interface.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859432/mouse_v52w7p.png'
      },
      {
        name: 'Touchscreen',
        abbreviation: null,
        definition: 'Allows input directly through touch.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859522/touch_aaspnf.png'
      },
      {
        name: 'Digital Camera',
        abbreviation: null,
        definition: 'Inputs photos into a computer.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859549/digital_xcnyde.png'
      },
      {
        name: 'Digital Video Camera',
        abbreviation: null,
        definition: 'Inputs video footage.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859613/camera_lr6su6.png'
      },
      {
        name: 'Scanner',
        abbreviation: null,
        definition: 'Converts physical images into digital files.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859626/scanner_xbynma.png'
      },
      {
        name: 'Biometric Device',
        abbreviation: null,
        definition: 'Inputs data using fingerprints or other biological traits.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859694/biomet_azi78m.png'
      },
      {
        name: 'Monitor',
        abbreviation: null,
        definition: 'Displays visual output from the computer.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859703/monitor_jjlprf.png'
      },
      {
        name: 'Projector',
        abbreviation: null,
        definition: 'Projects computer display onto large screens.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859799/projector_gcilyo.png'
      },
      {
        name: 'Printer',
        abbreviation: null,
        definition: 'Creates hard copies of digital documents.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859807/printer_br0obg.png'
      },
      {
        name: 'Speakers',
        abbreviation: null,
        definition: 'Output sound.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859839/speaker_moq8m7.png'
      },
      {
        name: 'Headphones',
        abbreviation: null,
        definition: 'Personal audio output.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859912/headphones_mnocy8.png'
      },
      {
        name: 'Fax Machine',
        abbreviation: null,
        definition: 'Sends and receives scanned documents.',
        category: 'Input & Output Devices',
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1763859921/faxmachine_nhpv3i.png'
      },
      // BIOS/Booting/Network
      {
        name: 'BIOS',
        abbreviation: null,
        definition: 'Software that ensures hardware works together and loads the operating system.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'POST',
        abbreviation: 'Power-On Self Test',
        definition: 'A hardware test the BIOS runs during startup.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Interrupt Handlers',
        abbreviation: null,
        definition: 'Small programs that translate device signals for the CPU.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Device Drivers',
        abbreviation: null,
        definition: 'Software that identifies and manages hardware devices.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'CMOS',
        abbreviation: null,
        definition: 'Chip storing BIOS settings such as time, boot order, and hardware info.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Boot Sequence',
        abbreviation: null,
        definition: 'The order devices are checked to load the operating system.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Cold Boot',
        abbreviation: null,
        definition: 'A startup from power-off.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Reboot',
        abbreviation: null,
        definition: 'Restarting without powering off.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'UEFI BIOS',
        abbreviation: null,
        definition: 'Modern BIOS supporting large drives and advanced features.',
        category: 'BIOS/Booting/Network',
        image: null
      },
      {
        name: 'Legacy BIOS',
        abbreviation: null,
        definition: 'Older BIOS system with limitations like 2.1TB drive support.',
        category: 'BIOS/Booting/Network',
        image: null
      }
    ];

    // Step 3: Insert all terms - check for existing first
    const insertedTerms = [];
    for (const term of allTerms) {
      try {
        // Check if term already exists
        const checkResult = await pool.query(
          'SELECT * FROM coc1_terms WHERE term_name = $1',
          [term.name]
        );

        if (checkResult.rows.length > 0) {
          // Update existing term
          const updateResult = await pool.query(
            `UPDATE coc1_terms 
             SET abbreviation = $1, definition = $2, category = $3, image_url = $4
             WHERE term_name = $5
             RETURNING *`,
            [term.abbreviation, term.definition, term.category, term.image, term.name]
          );
          insertedTerms.push(updateResult.rows[0]);
          console.log(`✓ Updated: ${term.name}`);
        } else {
          // Insert new term
          const insertResult = await pool.query(
            `INSERT INTO coc1_terms (term_name, abbreviation, definition, category, image_url)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [term.name, term.abbreviation, term.definition, term.category, term.image]
          );
          insertedTerms.push(insertResult.rows[0]);
          console.log(`✓ Inserted: ${term.name}`);
        }
      } catch (err) {
        console.log(`! Error with ${term.name}: ${err.message}`);
      }
    }

    res.json({ 
      message: 'All COC 1 terms processed successfully', 
      terms: insertedTerms,
      count: insertedTerms.length,
      categories: {
        'Types of Computer': insertedTerms.filter(t => t.category === 'Types of Computer').length,
        'Operating System Basics': insertedTerms.filter(t => t.category === 'Operating System Basics').length,
        'Computer Software and Language': insertedTerms.filter(t => t.category === 'Computer Software and Language').length,
        'Computer System, Computer Case & Form Factors': insertedTerms.filter(t => t.category === 'Computer System, Computer Case & Form Factors').length,
        'Power Supply & Connectors': insertedTerms.filter(t => t.category === 'Power Supply & Connectors').length,
        'Parts of the Motherboard': insertedTerms.filter(t => t.category === 'Parts of the Motherboard').length,
        'Cooling System and Expansion Cards': insertedTerms.filter(t => t.category === 'Cooling System and Expansion Cards').length,
        'Memory & Storage Devices': insertedTerms.filter(t => t.category === 'Memory & Storage Devices').length,
        'Drive Cables & Port Connectors': insertedTerms.filter(t => t.category === 'Drive Cables & Port Connectors').length,
        'Input & Output Devices': insertedTerms.filter(t => t.category === 'Input & Output Devices').length,
        'BIOS/Booting/Network': insertedTerms.filter(t => t.category === 'BIOS/Booting/Network').length
      },
      status: 'completed'
    });
  } catch (error) {
    console.error('Error initializing COC 1:', error);
    res.status(500).json({ error: 'Failed to initialize COC 1', details: error.message });
  }
});

// Get all COC 1 terms
router.get('/terms', async (req, res) => {
  try {
    const category = req.query.category;
    let query = 'SELECT * FROM coc1_terms ORDER BY category, term_name';
    const params = [];

    if (category) {
      query = 'SELECT * FROM coc1_terms WHERE category = $1 ORDER BY term_name';
      params.push(category);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Failed to fetch terms' });
  }
});

// Get term by ID
router.get('/terms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM coc1_terms WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Term not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching term:', error);
    res.status(500).json({ error: 'Failed to fetch term' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM coc1_terms ORDER BY category'
    );
    res.json(result.rows.map(row => row.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all reviewers
router.get('/reviewers', async (req, res) => {
  try {
    const category = req.query.category;
    let query = 'SELECT * FROM coc1_reviewers ORDER BY category, reviewer_name';
    const params = [];

    if (category) {
      query = 'SELECT * FROM coc1_reviewers WHERE category = $1 ORDER BY reviewer_name';
      params.push(category);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviewers:', error);
    res.status(500).json({ error: 'Failed to fetch reviewers' });
  }
});

// Get all quiz questions
router.get('/quiz/questions', async (req, res) => {
  try {
    const category = req.query.category;
    const difficulty = req.query.difficulty;
    let query = 'SELECT * FROM coc1_quiz_questions WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }

    if (difficulty) {
      query += ' AND difficulty = $' + (params.length + 1);
      params.push(difficulty);
    }

    query += ' ORDER BY id';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Get quiz question with choices
router.get('/quiz/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const questionResult = await pool.query(
      'SELECT * FROM coc1_quiz_questions WHERE id = $1',
      [id]
    );

    if (questionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const choicesResult = await pool.query(
      'SELECT id, choice_text, is_correct FROM coc1_quiz_choices WHERE question_id = $1 ORDER BY id',
      [id]
    );

    const question = questionResult.rows[0];
    question.choices = choicesResult.rows;

    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// Submit quiz answer
router.post('/quiz/submit', verifyToken, async (req, res) => {
  try {
    const { questionId, selectedChoiceId } = req.body;
    const userId = req.userId;

    // Get the correct answer
    const correctResult = await pool.query(
      'SELECT id FROM coc1_quiz_choices WHERE question_id = $1 AND is_correct = true',
      [questionId]
    );

    const isCorrect = correctResult.rows.length > 0 && 
                     correctResult.rows[0].id === selectedChoiceId;

    // Record the attempt
    await pool.query(
      'INSERT INTO coc1_quiz_attempts (user_id, question_id, selected_choice_id, is_correct) VALUES ($1, $2, $3, $4)',
      [userId, questionId, selectedChoiceId, isCorrect]
    );

    // Update user progress
    const progressResult = await pool.query(
      'SELECT * FROM coc1_user_progress WHERE user_id = $1',
      [userId]
    );

    if (progressResult.rows.length === 0) {
      await pool.query(
        'INSERT INTO coc1_user_progress (user_id, total_questions, correct_answers, score, last_attempted) VALUES ($1, 1, $2, $3, NOW())',
        [userId, isCorrect ? 1 : 0, isCorrect ? 100 : 0]
      );
    } else {
      const progress = progressResult.rows[0];
      const newTotal = progress.total_questions + 1;
      const newCorrect = progress.correct_answers + (isCorrect ? 1 : 0);
      const newScore = (newCorrect / newTotal) * 100;

      await pool.query(
        'UPDATE coc1_user_progress SET total_questions = $1, correct_answers = $2, score = $3, last_attempted = NOW() WHERE user_id = $4',
        [newTotal, newCorrect, newScore, userId]
      );
    }

    res.json({ isCorrect });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Get user progress
router.get('/progress', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      'SELECT * FROM coc1_user_progress WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        totalQuestions: 0,
        correctAnswers: 0,
        score: 0,
        lastAttempted: null
      });
    }

    const progress = result.rows[0];
    res.json({
      totalQuestions: progress.total_questions,
      correctAnswers: progress.correct_answers,
      score: progress.score,
      lastAttempted: progress.last_attempted
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Get user quiz attempts
router.get('/attempts', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT qa.*, qq.question_text, qq.category, qc.choice_text as selected_choice
       FROM coc1_quiz_attempts qa
       JOIN coc1_quiz_questions qq ON qa.question_id = qq.id
       LEFT JOIN coc1_quiz_choices qc ON qa.selected_choice_id = qc.id
       WHERE qa.user_id = $1
       ORDER BY qa.attempted_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching attempts:', error);
    res.status(500).json({ error: 'Failed to fetch attempts' });
  }
});

module.exports = router;
