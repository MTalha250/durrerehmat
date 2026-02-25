import Hero from "@/components/common/Hero";
import About from "@/components/home/About";
import Activity from "@/components/home/Activity";
import Steps from "@/components/about/Steps";
import Video from "@/components/about/Video";

import React from "react";

const AboutPage = () => {
  return (
    <div>
      <Hero title="About Us" img="/images/hero.png" />
      <About
        subTitle="Our Mission"
        title="Durr-e-Rehmat Girls Orphanage"
        description="The principal purpose of Durr-e-Rehmat Girls Orphanage is to care for orphan girls in a residential setting in Lahore. The orphanage's key aim is that all programme activities and interventions always put the best interests of the child first and foremost by promoting and protecting their well-being. The orphanage shall be responsible for their upbringing, health, education, social development, general welfare, training and skills development so that they can become self-sufficient and useful members of their community as well as make a positive contribution to Pakistani society at large."
        image="/images/about-page.jpeg"
      />

      {/* Vision Statement */}
      <div className="bg-[#F6F4F3] px-8 py-10 md:px-16 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-4xl">
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            Our Vision{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-blueish mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
            Our Journey & Vision
          </h1>
          <div className="space-y-4 text-zinc-600 lg:text-lg">
            <p>
              The orphanage started operations in November 2021 with 10 girls
              and the first phase of the orphanage catered for 20-25 girls in
              the range of 4-14 years of age by the end of the first year.
              Orphan girls coming to the orphanage are likely to be from Lahore
              and its surrounding districts. In general, girls are under 24 hour
              care/supervision of experienced mother-maids who look after the
              girls&apos; day to day needs whilst they are resident in the
              orphanage.
            </p>
            <p>
              Initially all the girls attended a local school to provide for
              their education appropriate to their age and academic ability,
              supplemented by additional tuition as required in the orphanage.
              At the same time, they are learning other life skills to become
              well rounded individuals. The day to day running of the orphanage
              is being managed by an experienced operations director.
            </p>
            <p>
              We are now in the second phase of our programme, as the orphanage
              numbers increase from 25 to 50 girls, their education provision
              has now switched to an in-house schooling set up within the
              orphanage and all teaching is being provided within the orphanage
              itself. This will not only serve to educate the girls residing in
              our orphanage but also a number of day-scholars who deserve
              education through charitable means.
            </p>
            <p>
              The in-house school/institution is providing both religious and
              secular education at all levels to enable girls to excel and those
              academically capable are then funded for higher education in
              religious and secular degree courses at external institutions. The
              residential facilities include girl&apos;s dormitories,
              accommodation for staff, teaching block, dining hall and a
              recreation area.
            </p>
            <p>
              The third phase in the orphanage&apos;s development envisages
              acquiring a larger building, either an existing building or
              purpose-built orphanage, and expanding the orphanage to cater for
              100-500 orphan girls. This will be very much dependant on the
              orphanage&apos;s funding base and the generosity of its donors.
            </p>
          </div>
          <div className="mt-8 border-l-4 border-[#8FBEB2] pl-6">
            <p className="text-lg font-semibold text-zinc-800">Farah Ahmed</p>
            <p className="text-zinc-500">
              CEO and Patron, Founder of Durr-e-Rehmat Girls Orphanage
            </p>
            <p className="text-zinc-500">Canal View, Lahore</p>
          </div>
        </div>
      </div>

      <Steps />
      <Video />
      <Activity />
    </div>
  );
};

export default AboutPage;
