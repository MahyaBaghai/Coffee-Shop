import { useTranslation } from "react-i18next";

export default function Custom404() {
    const { t } = useTranslation();
  return (
    <section className="@container">
        <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 ">
          <div className="mb-28 mt-48 w-full flex justify-center font-PoppinsMedium text-2xl text-zinc-700 dark:text-white">
            {t("NotFound")}
          </div>
        </div>
      </section>
  );
}
