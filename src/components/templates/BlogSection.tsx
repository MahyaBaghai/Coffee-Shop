import { FC } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import BlogCards from "@/components/modules/cards/BlogCard"
import { useTranslation } from "react-i18next"

const BlogSection : FC = () => {
  const { t } = useTranslation()
  return (
    <section id="blog-section" className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 mt-10 2xs:mt-15 md:mt-18 lg:mt-20">
        {/* Section header */}
        <div className="flex justify-between items-center md:pb-12 pb-6 text-zinc-700 dark:text-white">
          <div className="sectionTitle"> {t("blog.readables")}</div>
          <div className="sectionLink pb-2">
            <div className="hidden md:block"> {t("blog.viewAllPosts")} </div>
            <div className="md:hidden block"> {t("ViewAll")} </div>
            <MdKeyboardArrowRight className="sectionLinkIcon" />
          </div>
        </div>

        {/* Blog cards grid */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
          <BlogCards />
        </div>
      </div>
    </section>
  );
};

export default BlogSection 
