---
layout: post
title: Systems Architecture
published: false
---

> This is really just a draft at this point, but I wanted to put it up in it's present state anyway.

To define the architecture of the system you need to do the following things.

First, you have to identify the requirements of the system itself. Requirements gathering is accomplished through interviews and other forms of communication with key individuals within the company. All requirements identified must be gathered into a user requirements document. If possible during the requirements gathering phase any related business processes should be identified, and documented if they are not already.

With the requirements defined you must identify who will access the system, and how they will do so. It is important to note that use cases are not necessarily important, or unimportant, to system architecture. A use case is the identification of how a system will be used. An example of a use case might be that a developer must be able to categorize a defect within the system as being of a certain type. This would make another use case possible which is the need for users of the system to be able to generate reports based on the categorization of defects. These are features of the system itself, and irrelevant to the overall system architecture. The type of use case we are concerned with are how people will access your system, and these specific types of use cases are known as usage scenarios. To identify your usage scenarios you have to ask questions like: where is my user base? how will they access my system? how often will they access my system? how many will access my system at any given point in time, or in other words how many concurrent users must my system be capable of supporting? You might have a system with internal users as well as external users. The external users might only be company employees, only non-employees, or a mixture of both. What hardware is required to extend access to these users? If you know how many concurrent users you need to support you can scale up or down your architecture accordingly, which means that this information will be helpful in the next step which is to identify the architectural building blocks of your system.

Then, the requirements gathered are translated into a system that will meet those requirements. During this phase the individual elements, or architectural building blocks, necessary to meet the requirements are identified, as is the interaction between each of these elements. As an example, if you need a system to track defects in custom developed applications, and you need this system to be accessible from different regions and sites around the world it probably makes sense to implement a web hosted defect tracking system. This system will have the following as components:

- Web server software (IIS, Apache, ...)
- Web server
- Database server software (MS-SQL, MySQL, Oracle, DB2, ...)
- Database server
- Database (or possibly more than one)
- DMZ
- Firewall

After identifying the elements and their interactions you can create diagrams (models) to serve as communications tools to the business and IT.