import { Container, createStyles } from "@mantine/core";
import { useState } from "react";
import SideNav from "../Components/Nav/SideNav";
import { TopNav } from "../Components/Nav/TopNav";
const Home = () => {
    const useStyles = createStyles((theme) => ({
        closeSideBar: {
            left: "-300px !important",
        },
        layout: {
            overflow: "hidden",
            position: "relative",
            height: "100%",
            width: "100%",
        },
        sideBar: {
            height: "100%",
            transition: "all 0.2s linear",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: "200",
        },
        main: {
            overflow: "auto",
            height: "100%",
            transition: "all 0.2s linear",
            [theme.fn.largerThan("md")]: {
                marginLeft: "300px",
            },
        },
        closeSideBarMain: {
            marginLeft: "0px",
        },
    }));
    const { classes, theme } = useStyles();
    const [navOpen, setNavOpen] = useState(
        window.innerWidth <= theme.breakpoints.md ? true : false
    );
    return (
        <>
            <div className={classes.layout}>
                <aside
                    className={` ${navOpen ? classes.closeSideBar : ""} ${
                        classes.sideBar
                    }`}
                >
                    <SideNav navOpen={navOpen} setNavOpen={setNavOpen} />
                </aside>
                <main
                    className={`${classes.main} ${
                        navOpen ? classes.closeSideBarMain : ""
                    }`}
                >
                    <TopNav navOpen={navOpen} setNavOpen={setNavOpen} />
                    <Container my={"md"}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Debitis vero nam ullam dolorem necessitatibus
                            nihil fuga distinctio! Voluptatum fuga iusto
                            laborum, suscipit vero corporis maiores totam
                            voluptates ipsum assumenda aperiam alias praesentium
                            at sed minus earum consequuntur magni mollitia!
                            Dolor sint eos a quas voluptates aspernatur sapiente
                            repellendus non optio odio provident earum,
                            inventore suscipit esse, explicabo rerum laudantium.
                            Iure enim quam dolorum quod assumenda tempore
                            laborum aut distinctio et voluptates, maxime fugit,
                            similique laboriosam! Eos nesciunt adipisci quos
                            pariatur quod rerum accusamus aut, excepturi enim
                            fugiat suscipit delectus ab mollitia ut voluptatem
                            facere eum quas sunt vitae provident. Voluptatum sit
                            nesciunt modi! Quo similique nobis iste, alias
                            officia deleniti quasi debitis consequuntur
                            aspernatur perferendis ex iusto atque consequatur
                            magnam id adipisci voluptates optio at dolore facere
                            eos voluptate esse assumenda? Perspiciatis ratione
                            velit distinctio blanditiis consectetur itaque
                            sapiente exercitationem illum veniam reiciendis,
                            inventore odit numquam praesentium quasi voluptas
                            laudantium dolor et repellat libero, iusto
                            necessitatibus laborum? Ducimus, dolore rerum unde
                            sapiente blanditiis consequatur, ut dolor sit ad
                            obcaecati modi voluptatem vero aspernatur distinctio
                            praesentium saepe nostrum? Obcaecati ab repellendus
                            libero hic corrupti modi voluptatibus consequatur
                            sit totam possimus blanditiis, iusto alias, non
                            quod, quo rem temporibus optio voluptas tempora! Id
                            ex rem nobis, vitae fuga placeat, eius accusamus
                            aliquam veritatis explicabo dignissimos quae animi
                            natus assumenda? Nemo cum porro, quos amet dolorem
                            ea aperiam quas adipisci quam libero non explicabo,
                            fugiat deleniti architecto natus eaque repellendus
                            dolorum, provident vitae fugit culpa ratione ipsam
                            minima ducimus. Reiciendis odio quisquam praesentium
                            similique vero labore voluptatem blanditiis quaerat
                            quidem rerum, natus cupiditate. Rem autem, sint
                            dignissimos totam dolorem vitae perspiciatis
                            similique mollitia sit harum officiis deserunt cum
                            nisi quae omnis quo ea repellat minus perferendis
                            ratione laboriosam placeat voluptatem. Officia error
                            molestiae perferendis aspernatur aut quis
                            dignissimos! Ut rem animi exercitationem velit cum
                            ipsum officia incidunt eius neque amet aliquid
                            provident, non pariatur facilis consequatur
                            repudiandae assumenda minus id quasi. Reprehenderit,
                            voluptate ullam? Laudantium unde illo adipisci
                            inventore vel, est nesciunt, accusamus repellendus
                            laborum perspiciatis quo quae magnam tempora minima
                            laboriosam optio ad voluptas dolor perferendis
                            dolores, itaque eligendi! Dolor beatae similique
                            error. Quo, dolorem dolores! Accusamus minima fugiat
                            quisquam quibusdam quaerat cum cupiditate velit a
                            rerum, eos laudantium et consequatur maxime veniam
                            sint voluptas omnis ducimus odio nihil? Officiis,
                            laborum, nostrum quia maiores porro praesentium
                            aliquam suscipit necessitatibus atque possimus iusto
                            culpa eligendi. Necessitatibus possimus esse nobis
                            quaerat, non assumenda praesentium autem, ex,
                            molestiae maxime modi rerum excepturi. Est commodi,
                            animi cupiditate quae asperiores dolorum iste quam,
                            modi praesentium sapiente eligendi esse odio cum
                            quidem neque. Eum esse consectetur cumque, dolorem
                            repudiandae modi eius tempore nemo temporibus
                            explicabo, delectus unde eligendi, nesciunt
                            perspiciatis pariatur? Fuga nostrum omnis laboriosam
                            et dolorum nihil temporibus repellat vitae quisquam
                            quaerat quasi voluptate iste consequuntur laborum
                            fugiat ad, aut perferendis aliquam, explicabo, nulla
                            beatae illum! Cum a rerum explicabo perferendis
                            accusamus impedit praesentium aliquam adipisci quo
                            quisquam. Animi quibusdam est iure iusto neque harum
                            molestiae repellat dolore quisquam? Pariatur
                            provident labore quibusdam repellendus corrupti?
                            Doloribus, ab. Sunt eveniet explicabo accusamus,
                            delectus quisquam, architecto eius perferendis
                            atque, expedita harum officiis reiciendis! Magnam,
                            expedita! Quasi eligendi atque, ea illo cum tempora
                            enim ullam nobis iusto explicabo dolores inventore
                            quibusdam repudiandae nihil quaerat at aperiam
                            dolorum laudantium voluptates eius voluptate!
                            Tenetur enim iusto illum at veritatis molestiae
                            aliquid architecto. Unde possimus perspiciatis
                            eligendi. Nemo perspiciatis suscipit alias similique
                            explicabo veritatis deserunt optio est tenetur
                            laudantium magni nam error facilis, impedit nisi
                            libero eius sequi provident in commodi! Accusantium
                            neque in obcaecati est pariatur exercitationem
                            corrupti totam facere aspernatur laudantium ut saepe
                            ducimus magni, voluptas tempora, voluptatum sequi
                            libero. Deleniti sit dolorem quaerat ullam tenetur
                            iste labore dolore! Eum magni explicabo obcaecati.
                            Possimus qui nulla, officia aliquam voluptas
                            tenetur. Ratione quos voluptates voluptatibus ad
                            quisquam minima veniam sequi adipisci sint eum
                            recusandae repudiandae saepe perspiciatis laudantium
                            necessitatibus, itaque tempore sapiente eaque non
                            quae vel a possimus, nobis laborum? Doloremque, vel
                            laborum laboriosam earum fugit suscipit distinctio
                            magnam dolor assumenda eos, quam porro ratione
                            facilis dolorem corporis! Corrupti suscipit
                            molestiae quasi dolores, eligendi, incidunt mollitia
                            sequi rem obcaecati qui voluptate asperiores eum!
                            Magni dolore maxime atque optio, ipsa delectus
                            corrupti eveniet, deleniti quidem, voluptatem at
                            ratione libero! Omnis aspernatur nostrum totam cum a
                            maiores adipisci ipsam. Sequi accusamus illo fuga
                            provident perferendis debitis dolores. Similique
                            architecto quo, vero necessitatibus iste accusamus
                            exercitationem veniam facere dolore est veritatis
                            sapiente quibusdam. Praesentium debitis itaque, quae
                            ad culpa alias perferendis, sit, officiis corrupti
                            mollitia officia vel voluptatibus consequuntur aut
                            assumenda quo ut laudantium cumque aliquid! Unde
                            debitis tempore tempora, eius voluptatibus in
                            aspernatur enim dolor nulla, esse perspiciatis
                            dignissimos? Eos nesciunt eligendi magni sapiente
                            cum illo officia, corrupti, similique amet beatae
                            magnam error ratione velit enim, vel esse
                            repellendus dolor! Quasi, et mollitia inventore
                            voluptate consequatur, ut deleniti odio iste labore
                            dolorum sit beatae accusamus reiciendis rerum. Autem
                            voluptate voluptates velit laudantium sed neque ea
                            sequi aperiam laboriosam, in non nobis cupiditate
                            vel quasi, nihil error dolorum asperiores minima?
                            Ipsam nostrum molestiae reiciendis porro eligendi
                            consequatur blanditiis qui minima pariatur
                            dignissimos beatae ipsa rerum, placeat aperiam
                            laborum id officiis voluptates alias nihil
                            praesentium vero expedita facilis! Temporibus
                            accusantium natus numquam odit consequatur rem
                            laudantium perferendis perspiciatis blanditiis. Sint
                            ab natus fuga voluptate velit deserunt non est quam
                            sequi ipsa! Officia rem natus amet alias, harum
                            autem non ullam ipsa fugit recusandae animi quas
                            molestiae illo voluptatibus placeat qui, sint at
                            accusantium tempore, ab iusto doloribus. Itaque,
                            mollitia deserunt. Vel aperiam perspiciatis possimus
                            itaque ratione quibusdam culpa laudantium maxime
                            incidunt eaque cupiditate aliquam, error dolores,
                            rem exercitationem totam. Sed, possimus eligendi.
                            Rem aliquam officiis eligendi sint error similique,
                            vel adipisci repellendus reiciendis temporibus
                            quisquam et natus facilis eum nemo nihil libero
                            exercitationem enim. Quasi possimus nulla harum
                            minus maxime dicta accusamus a, distinctio
                            temporibus facilis eaque soluta fuga tempore
                            blanditiis vel ratione! Ea necessitatibus doloribus,
                            animi commodi dolorem vero dicta? Magni suscipit non
                            eius inventore incidunt. Nam eos explicabo enim
                            doloribus laboriosam? Ipsam aliquid numquam
                            doloremque itaque iste saepe, perferendis fuga
                            veritatis, dolorem nam quos ea quis repudiandae
                            corporis pariatur reprehenderit obcaecati quae. Unde
                            illum rem laudantium iste ipsa molestiae
                            consequuntur nisi odio, eaque corporis libero, magni
                            distinctio quibusdam. Optio, quaerat possimus.
                            Aliquam consectetur sequi pariatur deleniti quo illo
                            dolorem quibusdam sed a hic alias debitis rem est
                            quaerat architecto blanditiis facilis odio, ut
                            asperiores suscipit! Iure deserunt, sint eos numquam
                            nostrum maxime distinctio velit asperiores fugit
                            dolore explicabo architecto culpa non ea illo atque
                            sapiente voluptatibus voluptatem aperiam omnis nulla
                            adipisci quia? Dolorem est officiis nulla maiores
                            unde nostrum ipsa. Cupiditate modi quae libero error
                            nesciunt optio iusto reprehenderit aperiam facilis
                            asperiores sit sunt laboriosam distinctio unde,
                            animi laudantium quidem nam, delectus assumenda ex
                            aspernatur illo repudiandae veritatis officia.
                            Voluptas laboriosam dicta aspernatur eos placeat
                            molestias, aperiam qui quos nemo, sit ratione ad
                            itaque laborum molestiae neque maiores voluptates
                            voluptatibus quo at, esse excepturi minima? Corporis
                            voluptas nostrum vel debitis itaque quae ratione
                            quaerat veniam sit doloribus. Perspiciatis atque
                            quaerat amet deleniti, tempora blanditiis quibusdam
                            exercitationem quod placeat, aspernatur ipsa non
                            aliquid? Explicabo qui iure debitis corporis quae,
                            id dolorem accusamus nemo! Numquam, tempore
                            nesciunt? Ut voluptate nulla aliquam accusamus
                            repellendus dolorum eum voluptas doloremque, unde
                            optio consectetur quis sequi autem dicta
                            exercitationem ex facere quia a quaerat totam omnis
                            magni! Voluptatem tenetur fuga vero inventore nihil
                            sed facere corrupti culpa! Fuga quisquam debitis qui
                            laboriosam dolor assumenda ut porro, corrupti
                            exercitationem incidunt vero deleniti illum
                            accusantium saepe aliquam commodi ad! Aperiam, quo?
                            Est veritatis repudiandae soluta quo velit quidem id
                            tenetur voluptates placeat numquam sed quia cum
                            nulla expedita, earum neque deserunt ab totam
                            aliquid voluptatum dolor necessitatibus unde
                            voluptas assumenda. Hic tempora nostrum dolore
                            molestias veritatis maiores laudantium. Hic aliquid
                            laborum facere rem architecto ipsa provident
                            reiciendis deserunt dolor fugiat, aut illo, non
                            nesciunt totam sit eius quasi, repellat earum atque.
                            Perferendis quisquam praesentium esse magni, ducimus
                            odio sapiente temporibus beatae quos debitis quasi
                            deleniti quae, tempora accusantium eligendi quaerat
                            maxime, corporis id at suscipit amet unde ea dolore
                            nam? Sequi quasi aliquid facilis autem eum, corrupti
                            assumenda quis, cupiditate voluptatum expedita eaque
                            tenetur aut laboriosam voluptates distinctio. Omnis
                            nulla vitae deleniti fugiat sapiente magnam
                            blanditiis cum. Perspiciatis magnam nulla ad,
                            consequatur assumenda officiis veniam, asperiores
                            aspernatur dignissimos dolores doloribus libero fuga
                            impedit earum quasi provident doloremque iure quas
                            accusamus quae debitis voluptatem dicta neque
                            mollitia? Dicta distinctio qui ut eveniet illum
                            nihil, similique, nam quasi eligendi harum inventore
                            mollitia, fugiat ipsam maiores animi dolore esse! Ab
                            nostrum, unde sunt a optio dignissimos architecto
                            mollitia laudantium neque maiores fugit,
                            necessitatibus sequi odit laboriosam, magni eveniet?
                            Quod repudiandae facere debitis culpa est,
                            voluptates quibusdam nulla quas a accusantium
                            consequuntur commodi eligendi asperiores rem quae
                            labore enim facilis non recusandae, iste cumque
                            repellat suscipit in iure? Earum unde, quo explicabo
                            cum natus aliquam quidem vero provident accusamus
                            adipisci in optio ex ipsam numquam et, tempore
                            sapiente iure porro assumenda beatae necessitatibus
                            delectus dignissimos reprehenderit voluptas! Cum
                            molestias impedit, nisi voluptatum alias dolor at
                            eius error voluptatem quae est, nesciunt animi. Aut
                            atque dolor nam, repellendus dolorum consectetur
                            harum blanditiis qui ab quos excepturi provident
                            enim asperiores quibusdam officiis eius voluptas
                            assumenda sunt itaque tempora! Itaque maxime
                            praesentium omnis sunt reiciendis, earum quidem
                            repellendus totam qui illum nesciunt voluptates
                            exercitationem nemo magnam aliquam odit dignissimos
                            ipsam quia voluptatibus culpa molestiae eos
                            laboriosam amet? Quidem, cumque nam enim aspernatur
                            eos iusto soluta nesciunt voluptatem quod odio eius
                            magnam modi eaque dicta exercitationem. Dignissimos
                            sint, soluta minus eveniet non molestiae consectetur
                            suscipit voluptates voluptatum harum labore odio
                            animi neque fuga quo optio temporibus, quidem a
                            placeat velit sequi quis. Expedita mollitia cum
                            impedit earum eligendi accusamus vitae culpa!
                            Officiis beatae, ratione soluta dolorem temporibus
                            explicabo quia magni reiciendis, sint debitis
                            laborum incidunt, molestias eaque eos repellendus.
                            Asperiores perspiciatis porro eos laborum dolores
                            nesciunt animi iure saepe velit cupiditate sunt quo
                            quae eligendi non ullam, repellat corrupti tempora
                            officiis quaerat earum fugit nostrum ea delectus.
                            Quis possimus quo, cupiditate eligendi saepe ipsam
                            veritatis ab quibusdam animi debitis optio eius
                            mollitia! Placeat cumque earum necessitatibus neque
                            deleniti! Fugit reprehenderit beatae enim sint amet
                            assumenda accusantium voluptate inventore autem quo
                            voluptatem dolores, tenetur placeat voluptas est,
                            praesentium itaque aliquam, debitis consectetur
                            numquam voluptatum eius explicabo sit nulla. Odio,
                            sequi minima nobis sint consequatur necessitatibus
                            consectetur tempora a praesentium laborum sapiente
                            adipisci nulla temporibus tempore soluta quasi culpa
                            placeat, qui ratione debitis, perspiciatis error.
                            Praesentium molestias doloribus quasi iste, quod
                            delectus, non error laborum ullam dicta
                            exercitationem magni maxime modi, sit eligendi
                            maiores a in eum nostrum cumque quam dolores?
                            Quisquam cumque perspiciatis totam deserunt maxime
                            accusamus possimus neque odit necessitatibus
                            eligendi in ab temporibus cum quae eos omnis
                            laboriosam, ut distinctio officia quia veritatis
                            delectus! Quasi cum nostrum at minima, atque
                            voluptates autem dolore, nam molestiae dicta
                            molestias. Voluptate earum beatae est voluptatibus
                            itaque corporis enim dolores, fuga et expedita odio
                            in voluptas iusto, fugiat consectetur, sit veniam
                            vel distinctio. Commodi velit nisi cum reiciendis,
                            explicabo ratione recusandae fugiat laboriosam nobis
                            adipisci, facere itaque, debitis distinctio! Nisi,
                            quo non. Repellendus veritatis praesentium repellat
                            cumque officiis modi odit aliquam. Nemo ratione
                            neque accusamus odit, quod est minima adipisci
                            veniam quasi earum quibusdam quisquam deserunt
                            distinctio sequi corporis minus a iure ex? Atque
                            quasi, id ex dolor asperiores explicabo, tenetur
                            molestias distinctio dicta, voluptatibus placeat?
                            Non optio enim placeat facere quis quisquam eius
                            assumenda expedita, odit qui adipisci impedit rerum
                            voluptatibus libero distinctio soluta maxime ipsa
                            possimus suscipit nemo saepe id magni quia. Eveniet
                            natus sit, omnis ex sint amet. Tenetur, amet,
                            repudiandae molestiae, assumenda quasi in quas optio
                            quibusdam totam vitae fugit autem odit quos sed
                            ipsam ex sint eligendi deleniti sequi repellendus
                            voluptatibus impedit. Quasi tenetur nulla officia
                            doloribus ipsam voluptate consequuntur eius
                            recusandae vitae optio incidunt corporis velit
                            aliquid fugiat debitis, voluptatem iusto molestiae
                            tempora eaque autem, cumque placeat laudantium at?
                            Itaque ducimus molestias voluptas, odit eum
                            excepturi voluptatum nihil expedita quod, distinctio
                            delectus dolores doloremque libero! Neque ad tenetur
                            similique aperiam hic nostrum voluptatibus ullam
                            sint vero maiores quia sit sed expedita officiis
                            ipsa, corporis atque? Illo debitis laboriosam ipsa
                            explicabo, excepturi aperiam expedita ad! Magni
                            asperiores, est eveniet nemo ipsa nulla omnis sunt
                            dolorum ad rerum eum numquam, cupiditate quos
                            tempore sapiente magnam optio, nostrum amet ratione
                            reprehenderit minima iure. Ullam debitis sequi a
                            corporis, quos explicabo ipsam beatae odit tempora
                            nihil ducimus, dolor harum non, praesentium fugiat!
                            Dignissimos eos doloribus animi dolor. Labore
                            reiciendis doloribus tempora sapiente iure. Modi
                            ullam, quia soluta harum quasi laboriosam veniam
                            voluptatum omnis nulla consectetur dicta, error
                            obcaecati beatae sed ipsa vero quas. Rem tenetur
                            distinctio doloremque praesentium possimus ullam
                            doloribus recusandae nemo vitae maiores accusamus
                            voluptatum necessitatibus maxime, qui corporis
                            facilis enim veritatis atque! Possimus fugit fugiat
                            inventore beatae delectus quasi. A sapiente beatae
                            deserunt delectus voluptas, earum perspiciatis optio
                            quisquam tempora natus blanditiis velit laboriosam
                            fugit quidem modi ex ad labore quis atque! Maiores
                            quas ex corrupti quo culpa! Voluptatibus placeat,
                            libero odio ea suscipit ipsam ducimus, ipsa nisi
                            illum corrupti ex quas mollitia ad vitae, unde
                            reprehenderit facilis? Doloremque esse ipsa nam
                            rerum cumque nulla. Unde, tenetur. Doloribus modi
                            odio iusto quo, saepe dolore dolorem, voluptate nam
                            ratione similique minus suscipit doloremque
                            assumenda vitae architecto fuga aspernatur.
                            Veritatis aliquam atque animi labore at dolorem
                            debitis aperiam odio, asperiores vitae? Eaque
                            exercitationem quod iusto excepturi fuga in rem
                            doloremque, officiis delectus nemo, incidunt quia
                            adipisci quos aut culpa nesciunt vero est vitae
                            pariatur quaerat minima quas debitis deleniti ex!
                            Mollitia eaque corporis illo libero maiores labore,
                            laboriosam adipisci pariatur, sapiente officia,
                            consequatur nam unde. Eaque laudantium, non
                            reprehenderit expedita ad doloribus quod saepe
                            dolorem repudiandae magnam sed nobis nisi quasi
                            rerum animi, nihil explicabo, commodi officiis ea!
                            Et minima placeat, exercitationem corporis sequi
                            dolore consequatur unde doloribus repudiandae quidem
                            ut mollitia quam similique aliquam! Mollitia
                            provident ullam molestiae nobis ipsam voluptatum
                            totam quod numquam quisquam facere quibusdam amet,
                            esse nulla blanditiis. Doloremque impedit, quas
                            nostrum, maiores laborum rerum debitis consectetur
                            ipsum, dolore natus voluptate pariatur vero odio
                            dicta vitae illum iure qui distinctio. Explicabo,
                            aliquam! Tempore error porro inventore similique
                            autem commodi iusto? Tenetur sequi unde nam mollitia
                            nobis pariatur similique, nesciunt nihil blanditiis
                            assumenda, sit dignissimos officia, et culpa fugiat
                            aut quas explicabo laboriosam? Excepturi alias quo
                            mollitia adipisci. Odit tenetur necessitatibus quos
                            assumenda quaerat saepe eveniet a, ipsam facere
                            quisquam ab. Veritatis laborum dignissimos est illo
                            ipsam suscipit beatae fugiat numquam quasi ab cumque
                            itaque quia ad, veniam, perspiciatis eveniet,
                            placeat vitae. Sit impedit, rem veritatis nihil
                            perspiciatis dicta adipisci, error sequi velit
                            officiis vitae unde illo delectus! Ea asperiores ut
                            ipsam fuga, ab dolor modi culpa officia minus sunt
                            perspiciatis aspernatur. Recusandae sequi modi earum
                            aliquid magnam eius. Natus sunt dolorem quia
                            recusandae dolorum suscipit molestiae vero
                            repudiandae quam aut animi et, odit corrupti.
                            Commodi, facilis rem! Itaque inventore dolorum
                            facere dolorem! Ut minus quo reiciendis aspernatur
                            sapiente nesciunt itaque totam, quod vitae ab veniam
                            enim explicabo quis dicta corporis excepturi sed
                            debitis iste magni eligendi aliquam deleniti
                            voluptates! Rem sapiente unde dolor aliquid amet non
                            quos obcaecati corporis quaerat dolorem itaque
                            voluptate, est maxime natus dignissimos eius labore
                            cupiditate fugit. Placeat aperiam minima ducimus,
                            praesentium quidem nam aut qui reiciendis totam
                            iusto doloribus culpa similique rem? Soluta eos hic
                            necessitatibus temporibus laboriosam fugit deserunt
                            ut dolore beatae voluptatum? Similique accusamus
                            odit esse officiis! Nam dolor non voluptates
                            repellat quaerat necessitatibus numquam accusantium
                            exercitationem cupiditate autem, sint adipisci?
                            Impedit numquam repudiandae voluptatum cum unde
                            harum dolorem ad, magni est quis. Laborum asperiores
                            quam fuga et assumenda modi possimus corrupti
                            architecto nisi ab officia in quisquam expedita
                            repudiandae, labore fugit reprehenderit, error,
                            debitis exercitationem consectetur ex? Accusantium
                            aliquam cupiditate minima, maxime pariatur vel quas
                            corporis autem, quaerat voluptates, voluptas harum?
                            Soluta quibusdam dolor sed nam et nostrum beatae,
                            corrupti asperiores, nemo quisquam error similique
                            accusantium quos vero veritatis fugiat in
                            distinctio, alias voluptates cum delectus! Tenetur,
                            ullam mollitia, distinctio consequatur ipsa rem
                            magnam aspernatur atque sed obcaecati minus
                            excepturi unde nulla? Debitis dolores doloribus sit
                            quod a aut veritatis nesciunt perferendis ad ab
                            optio minus fugit magni placeat fuga eum vel sint
                            iusto, tempore facilis aliquam voluptate excepturi
                            amet. Rerum porro sint deserunt eos beatae, aut
                            illum consequatur dolores facilis blanditiis
                            possimus adipisci odio voluptates deleniti?
                            Assumenda quisquam libero sequi! Sit recusandae
                            itaque distinctio suscipit nostrum. Quae qui,
                            architecto unde cum alias ratione explicabo delectus
                            placeat porro consequuntur quos vero ducimus eos
                            tenetur eaque! Aliquid aut unde accusamus veritatis
                            cupiditate quis mollitia recusandae repellendus
                            magni quae laudantium porro explicabo, molestias qui
                            dolores deleniti, omnis velit suscipit placeat
                            tenetur, in perferendis? Quo molestias nobis ipsum
                            quibusdam ullam veritatis illo cupiditate officia
                            iste quam sapiente, doloremque excepturi, vel animi,
                            blanditiis ducimus atque? Possimus iusto consectetur
                            error cumque assumenda vitae, modi voluptates dolore
                            fugit neque aliquam officiis dolor porro totam nemo,
                            repudiandae eius ullam mollitia? Veniam soluta
                            quidem itaque dolorem, nemo quisquam. Nisi labore
                            placeat consequuntur doloribus et officia culpa odio
                            consectetur quam, laboriosam adipisci deserunt, vero
                            non eum ea quos consequatur pariatur voluptatem
                            iusto eveniet dolor possimus! Minus facere quas sit
                            nihil fuga nobis incidunt at est commodi cupiditate
                            maxime odit maiores doloremque culpa dolore ex autem
                            eligendi ab, aperiam iusto accusamus voluptates
                            cumque excepturi? Nemo maxime qui mollitia dolore!
                            Tempore nulla libero veritatis quo, delectus ducimus
                            maxime est consectetur hic quas cupiditate assumenda
                            optio atque molestias, sed veniam corporis
                            blanditiis ratione dolorum quod? Modi earum
                            consectetur atque tenetur! Excepturi asperiores
                            quidem accusantium modi ea in laudantium quis, ipsam
                            facilis nemo eos maiores id? Deleniti rem commodi
                            nobis laudantium consequatur id vel optio similique
                            repudiandae beatae hic a cum neque minus voluptates
                            debitis, esse aliquid eius quis, inventore placeat?
                            Rem, expedita suscipit numquam illum sequi
                            consequuntur eius alias! Quos incidunt soluta
                            aperiam voluptate consequuntur odit vero cupiditate?
                            Dignissimos minus quod tempore cupiditate aperiam,
                            ratione provident mollitia dicta dolores
                            reprehenderit eveniet aspernatur optio! Corrupti
                            tenetur a earum molestiae veritatis amet animi in
                            maxime quaerat officiis voluptas temporibus, tempora
                            obcaecati at aspernatur illum. Ipsum in animi
                            laudantium odit similique aliquam magnam quam,
                            debitis, praesentium, culpa inventore nesciunt est.
                            Tempora ullam dolore deserunt quasi saepe?
                            Recusandae voluptatibus perferendis id corporis
                            adipisci ducimus distinctio officiis! Repellendus
                            quo harum ex hic laborum dicta architecto dolores,
                            iusto ullam necessitatibus nihil earum vitae vero a
                            sed incidunt nemo maiores ratione, fuga voluptatum
                            eum impedit? Ipsa ad autem modi quos, illo
                            cupiditate fugiat quae non nihil? Odio id obcaecati
                            a, possimus quas magnam unde voluptate veritatis
                            delectus eius molestias temporibus facilis eum
                            dolore, ullam, at numquam. Dolor officiis dolores
                            magnam amet, similique cumque, vitae illum, sunt
                            unde consectetur culpa blanditiis quidem fuga!
                            Debitis qui odio blanditiis animi maxime numquam
                            facilis minus, tempore eligendi! Ut explicabo, sequi
                            numquam mollitia corrupti minus error. Molestias,
                            nulla sapiente, nesciunt id distinctio ex ducimus
                            reiciendis aperiam hic nisi unde asperiores
                            laudantium. Commodi et, sed rem cum totam itaque
                            unde officiis blanditiis ipsam culpa libero soluta
                            consequuntur? Nisi obcaecati est, aliquam fugiat
                            assumenda deserunt repudiandae dignissimos sed
                            consectetur quis. Aliquid illo nulla consequatur
                            voluptatum officia, et odit rem unde cumque eius
                            dolore vel vero obcaecati laudantium aspernatur
                            molestiae sunt provident voluptas id eaque minus
                            praesentium itaque architecto. Aliquid atque non
                            eligendi impedit laudantium sunt, deleniti optio
                            cumque hic libero in ea a molestiae accusantium
                            labore ad rerum doloribus aperiam harum amet! Cum,
                            magnam. Deserunt reprehenderit voluptatem tempora.
                            Laboriosam consequuntur, temporibus minus fugiat
                            saepe odio sequi quisquam, numquam incidunt corporis
                            mollitia molestiae accusamus quae doloribus totam
                            rerum, quod quas! Facere in quam modi deserunt
                            architecto eveniet suscipit quia voluptas dicta eius
                            ea quidem dolore veritatis reiciendis temporibus
                            reprehenderit, obcaecati voluptatem accusantium,
                            nulla aliquam consequatur cumque optio. Culpa vitae
                            ducimus, dolore corporis inventore dicta aperiam
                            ipsum quam cumque quod necessitatibus iusto commodi
                            rerum dolor soluta quis eum sed nisi eaque! Numquam
                            id, dolor optio fugit quae consectetur corrupti
                            maiores. Quam illum aut voluptates minus earum ut
                            obcaecati commodi quaerat velit debitis quod
                            expedita quis, necessitatibus ad corporis magnam, at
                            harum magni! Fuga laborum ipsa error ullam
                            voluptatem provident impedit nihil vero sit dicta,
                            magni atque distinctio officiis modi aliquid debitis
                            non omnis corporis iusto odit id unde dolore.
                            Deleniti sunt porro, maiores reprehenderit quia
                            illum? Nemo tenetur ea eius quas ad, repellendus
                            esse ipsam, reprehenderit voluptatem possimus dicta
                            pariatur nam! Repellat, sit porro corporis
                            consequuntur iste nam neque expedita pariatur
                            voluptates officiis impedit deleniti fugit? Nostrum
                            consectetur ad ducimus repudiandae. Impedit,
                            voluptate nesciunt obcaecati quasi cupiditate
                            voluptatum quo quidem? Deleniti commodi dolorum, in
                            beatae optio ipsa eligendi, delectus culpa eaque hic
                            eos. Quis optio natus expedita reiciendis sequi?
                            Consequuntur delectus impedit aliquam omnis deleniti
                            deserunt cupiditate illo tempora unde in eos magni
                            corrupti possimus eum enim beatae similique
                            accusamus, eligendi ut mollitia adipisci at aperiam
                            placeat. Harum saepe natus officia iusto autem
                            cumque quos commodi non. Sunt ab asperiores illum
                            commodi, est aliquid beatae iste quo inventore. Quod
                            eum, minus corporis, nostrum laborum deserunt est
                            officia inventore quas provident excepturi libero
                            facere rerum quam sed recusandae! Provident sint,
                            voluptatibus, unde molestias vel perferendis
                            voluptates sunt at eligendi laborum omnis earum id
                            aspernatur totam similique alias hic. Hic molestias
                            esse quisquam vel. Sit nulla hic cupiditate earum
                            optio ea id assumenda architecto ullam officiis sed
                            minima, harum, accusamus aut distinctio corrupti.
                            Eos, ullam. Harum rerum, sapiente nam tempora fugit
                            doloremque veniam minima voluptatibus quidem. Nobis
                            consequuntur odit a fuga! Iste delectus est
                            reiciendis facere eum. Possimus fuga consectetur
                            dolor rem, est tempora iusto hic distinctio esse
                            fugit ducimus optio amet ipsam atque impedit?
                            Aperiam veniam adipisci sunt labore corrupti dolorum
                            qui fugiat error, vel, in fugit amet sequi et quia.
                            Delectus nesciunt totam repudiandae, quo consectetur
                            earum in accusamus tenetur accusantium sunt rem
                            ullam dicta odit nostrum perspiciatis voluptates ex
                            eveniet expedita culpa ducimus laudantium
                            recusandae! Deleniti eaque quos possimus similique
                            dignissimos cumque officiis et delectus molestias a,
                            expedita optio quod commodi impedit dolorum
                            provident rerum quasi voluptatem excepturi totam
                            maiores, illo ipsam nostrum! Exercitationem
                            doloremque officia officiis nam minima, eligendi
                            voluptatem nemo obcaecati culpa maiores modi
                            corporis delectus ratione aperiam, necessitatibus
                            dolore laborum. Dolore hic optio itaque nesciunt
                            officia fuga quas delectus similique suscipit odio.
                            Corrupti distinctio adipisci unde commodi quibusdam
                            laborum atque eligendi est cum incidunt quam sequi
                            esse beatae illum ad odit quasi, optio similique
                            suscipit corporis tempora! Quas amet unde ut
                            tenetur, cumque provident temporibus dicta aliquam
                            eveniet, vero nostrum doloremque omnis voluptatibus
                            sit aliquid? Temporibus sequi ullam distinctio
                            deleniti quis. Natus, ducimus, architecto magnam
                            accusantium in consequuntur rem dolores eos alias
                            aut sed officiis optio dignissimos doloremque atque
                            omnis voluptate cumque obcaecati voluptatibus!
                            Beatae, soluta iure tempore ipsum obcaecati
                            reprehenderit fugit molestias fuga sit quia voluptas
                            inventore possimus distinctio dolorem perspiciatis
                            dolores. Quo officia aperiam earum a fuga. Beatae
                            perferendis, est explicabo quia impedit cum
                            quibusdam alias doloremque vitae delectus,
                            voluptates quos? Quae fugit earum, voluptate cumque
                            neque incidunt quis iure eum quasi id, nam
                            consequuntur, aliquid rerum suscipit. Velit,
                            corporis? Fuga, eaque. Vitae dolore sunt, suscipit
                            tempore accusamus, vero, quas soluta dolores
                            obcaecati error magni quisquam minima excepturi
                            quasi. Dolorum molestiae tenetur corporis, illo
                            laudantium nihil aut quo quisquam nesciunt
                            necessitatibus harum ex. Reiciendis provident harum
                            doloremque magnam, placeat facilis. Vitae,
                            explicabo, tenetur voluptate provident minus
                            corporis reiciendis ad beatae esse saepe nemo, nulla
                            tempore. Illo quia culpa ratione harum voluptatem,
                            vero quas saepe delectus mollitia expedita ipsam ex
                            minus consequuntur soluta? Aliquam aliquid cumque
                            harum? Placeat non rerum maxime delectus ex hic
                            officiis quia eum officia. Perferendis reiciendis,
                            aliquid saepe vel tenetur tempora dolorum
                            consequuntur atque at quas quidem neque adipisci
                            numquam non ab minima ex debitis dolor sunt eum
                            itaque, consequatur sint! Maiores, molestias aperiam
                            voluptatum nam alias eius! Voluptatibus cupiditate
                            possimus nesciunt nostrum. Neque alias corporis
                            libero inventore, voluptatum excepturi maxime sed
                            eaque, officia commodi illum nisi dolor! Harum eos
                            quos autem aspernatur totam quasi quibusdam quam
                            veniam voluptatem modi dolor aperiam, nihil, eveniet
                            illo, explicabo ratione iusto nobis repudiandae!
                            Voluptatibus iusto, laboriosam omnis, eveniet,
                            soluta quis corrupti unde quam vitae itaque ipsam
                            earum quo? Fugiat voluptatum amet molestiae
                            dignissimos itaque rerum eaque culpa suscipit
                            officia, atque dolorum architecto nemo sunt tenetur
                            pariatur placeat. Obcaecati dolor impedit eius
                            corporis dolorem cumque doloribus praesentium, cum
                            magni! Nam aliquid id dignissimos fuga animi quidem
                            ipsam, eaque optio odit fugit magni molestias labore
                            impedit nostrum architecto fugiat amet et iusto,
                            maiores numquam ipsa dolores quos! Temporibus illo
                            quo fugit quasi officiis magnam quae sed amet id
                            maxime voluptatibus delectus reiciendis consequuntur
                            aut labore, nostrum fuga quas autem dignissimos
                            voluptate voluptas ullam? Atque dignissimos officia
                            nihil cumque ipsam maxime laborum et suscipit qui,
                            deserunt dolore eius architecto dolorem similique ex
                            repellat sint voluptate, consequuntur voluptates
                            dolorum autem repellendus, eveniet mollitia
                            provident. Aliquam animi ad ipsum a libero molestias
                            vel esse temporibus odio enim, aspernatur itaque
                            ipsam distinctio, iure vitae ut tempore quasi quis
                            laborum architecto laboriosam recusandae doloribus
                            repellat et! Maxime, sapiente quis. Accusantium quas
                            quaerat alias eius quo pariatur, fugit culpa nobis
                            eos neque soluta non perferendis atque, consequuntur
                            obcaecati doloremque quam eaque, sit corrupti a
                            laudantium deserunt voluptatem. Voluptas, explicabo?
                            Voluptatem hic placeat dolores reprehenderit modi,
                            laborum architecto quos! Animi, sed quam corrupti,
                            minus iure illum deleniti vitae repellat recusandae
                            eos nisi. Officiis error molestias facere laborum
                            dolores! Libero dignissimos eius excepturi
                            asperiores voluptate, aperiam consequatur corporis
                            dolore repellat adipisci qui quod ad ut quas tempora
                            doloremque? Veniam iste asperiores animi ut
                            voluptatibus rem, eligendi ipsum id, nesciunt rerum
                            iure nemo illo consequatur, omnis corporis tempore
                            harum inventore. Eum, mollitia unde blanditiis
                            beatae possimus iusto amet sed minima quam saepe
                            dicta quis praesentium nulla aliquam vero laboriosam
                            rerum a incidunt aperiam ad quasi impedit.
                            Cupiditate facere sed sunt delectus id commodi
                            reprehenderit, perferendis iusto optio facilis est
                            voluptatem sit accusantium nihil nostrum officia
                            harum a odio dolorem quo. Reprehenderit porro
                            repellendus reiciendis blanditiis nobis quidem
                            placeat ducimus sint earum ratione, exercitationem
                            nemo consequuntur ullam incidunt aspernatur, eveniet
                            ipsa veniam aperiam similique, iusto fuga ipsum? Ex
                            voluptatem sapiente blanditiis temporibus porro
                            ullam? Est autem nam commodi, soluta animi nesciunt
                            vel hic perspiciatis eveniet amet aperiam sequi
                            nulla illo asperiores laboriosam deserunt quas
                            tenetur consectetur sint quod sapiente. Aperiam
                            quaerat dolore dicta maxime repellendus labore
                            tempore corporis, at aspernatur autem impedit
                            laborum quos beatae, itaque sint delectus obcaecati.
                            Ad, nihil itaque vitae quos dolorem et deleniti,
                            quis saepe aliquam sit aspernatur natus veniam ipsam
                            beatae cum corrupti voluptatum atque obcaecati dolor
                            veritatis cumque fugit asperiores voluptates fuga.
                            Iusto accusantium rem dicta corrupti enim, deserunt
                            aut possimus, voluptatibus quae blanditiis amet
                            ullam a quos nulla expedita excepturi eos beatae
                            fugiat deleniti numquam illum sit quas? Eveniet eius
                            quos cumque unde esse aut blanditiis est nulla
                            assumenda dolorem molestiae reprehenderit ratione
                            voluptatum expedita, voluptate quia tempore aliquid?
                            Nisi minima, quis eligendi aspernatur facere
                            consequuntur veritatis hic numquam sunt adipisci
                            obcaecati veniam, commodi nihil amet consectetur
                            ipsa repellendus reiciendis placeat voluptatum dolor
                            necessitatibus corrupti libero tempore qui. Esse
                            velit, alias sed, dolore sit corrupti qui sapiente
                            libero ut vero quas, assumenda totam tenetur
                            dignissimos delectus beatae quidem voluptatibus
                            incidunt tempore hic nam. Iusto, cum, amet
                            necessitatibus nemo assumenda quis eligendi cumque
                            ducimus at ex officiis perferendis rem a modi aut
                            quasi dolores similique, doloribus veniam pariatur
                            ipsam. Nobis optio consectetur, pariatur illum odio,
                            culpa perferendis magni obcaecati alias sit suscipit
                            corrupti voluptates sunt cupiditate dolorem commodi
                            atque? Obcaecati ut dolore aspernatur voluptates
                            odit non laboriosam nam cupiditate error nesciunt
                            sequi quas sed, pariatur, perferendis veniam harum!
                            Voluptates veniam iure sapiente, omnis rerum alias
                            asperiores minima earum eius possimus expedita
                            beatae esse itaque nulla architecto eaque nihil.
                            Tempora at nam illum itaque voluptatum quaerat
                            laudantium saepe et. Eius alias praesentium nisi cum
                            quae aut, nam eligendi quam magni animi mollitia,
                            distinctio similique laudantium, sequi iste soluta
                            dolor nesciunt aperiam unde perspiciatis. Atque,
                            cumque earum quas reiciendis, quo deserunt ipsum ea
                            ab placeat dolor, ut neque voluptates culpa. Laborum
                            libero praesentium fuga ratione harum tenetur, ullam
                            tempore dolor voluptas ut unde sit vel facere
                            architecto temporibus officiis impedit dignissimos
                            maxime sunt. Animi voluptate fugiat recusandae sunt
                            beatae, voluptatibus, perferendis nisi eius
                            reiciendis similique fuga alias et ex consectetur
                            adipisci asperiores quos at vero quis reprehenderit
                            quae, a repudiandae? Necessitatibus quos ad atque,
                            natus tempora quam cupiditate dignissimos sed, vel
                            fugiat maxime, numquam reprehenderit magnam dolore.
                            Voluptatum unde, et quis est beatae enim quaerat, ab
                            tempore voluptas modi nobis fuga iusto aliquam
                            fugiat cum nisi accusamus excepturi architecto
                            dolores illum quam. Vel iure cumque sint. Modi earum
                            porro accusamus magnam at neque quis, maxime tempore
                            delectus, ratione voluptatum repellendus illo velit
                            optio vero officia natus. Cumque quis odit, ea
                            impedit ducimus sit, molestiae ipsa, dicta ullam
                            accusamus asperiores! Pariatur quia nesciunt fuga
                            quod quibusdam modi doloremque nobis excepturi quam
                            quos laborum corporis quis at odio voluptates non
                            commodi soluta voluptate eius, earum vel et qui
                            labore! Facilis, possimus. Incidunt consequuntur
                            ipsum est autem omnis animi aspernatur nesciunt,
                            reprehenderit sequi nobis nemo tempora eum aperiam
                            beatae sit, unde optio in, aliquid pariatur
                            praesentium sapiente quaerat? Deleniti molestiae nam
                            adipisci? Temporibus aperiam, possimus ipsum beatae
                            pariatur eum ex saepe aut aliquam suscipit, amet
                            neque molestiae totam sunt tenetur, cum minus qui!
                            Quisquam animi odit sequi nobis odio blanditiis
                            reiciendis voluptas fugit molestias! Eius rerum
                            eveniet officia optio, fugiat, nobis aliquid
                            cupiditate dicta consectetur unde, sint fugit culpa
                            veniam. Sit corrupti architecto ratione!
                            Perspiciatis officiis, nobis architecto amet
                            exercitationem adipisci totam id quaerat distinctio
                            esse! Voluptatibus quibusdam optio repellat itaque
                            ipsam, temporibus nisi at debitis distinctio
                            consequatur aliquam impedit praesentium assumenda
                            voluptas repellendus atque accusantium quod iste
                            blanditiis autem, facilis ipsum sapiente ut? Minima
                            impedit adipisci ut ad iure praesentium eveniet,
                            alias reiciendis rerum nam voluptatem nihil ipsa,
                            non assumenda temporibus magni obcaecati quis odio.
                            Doloribus asperiores ut totam libero minima vel
                            incidunt aut voluptatibus. Porro culpa iste unde
                            repudiandae tempora aspernatur, ad dolorum quos
                            praesentium. Blanditiis culpa, quibusdam eligendi,
                            illo eius at, sapiente possimus quaerat vitae atque
                            voluptas exercitationem quo deleniti repellat. Eius
                            deleniti neque delectus commodi, sapiente nulla
                            alias non architecto suscipit doloremque
                            consequatur, saepe libero impedit molestias vero.
                            Exercitationem illo ex nulla iusto doloremque omnis
                            consectetur quasi nihil ea, aliquam perferendis
                            officiis facere quos corrupti accusantium possimus
                            est. Enim in illum velit veniam, id repellendus
                            repellat ipsum voluptas? Molestiae consequatur
                            recusandae iusto expedita commodi aut veritatis eos
                            id, nihil deserunt, doloribus minus, quibusdam
                            numquam totam perferendis in.
                        </p>
                    </Container>
                </main>
            </div>
        </>
    );
};

export default Home;
