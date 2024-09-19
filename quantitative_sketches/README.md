<h1>Smithsonian Open Access - Quantitative Questions and Sketches</h1>

<h3>Who takes up space? Paintings in the NPG</h3>

Scale plays a huge role in viewing works in a museum in person - larger works typically grab ones attention quickly and require more wall space to display. In portraiture, especially painting, larger works are also generally more expensive to commission. Online, typically all works are displayed as the same size in thumbnails, which flattens these initial impressions. This visualization aims to answer the question of who takes up space in the NPG by displaying paintings scaled in relation to one another by their actual dimensions - this is similar to a bubble chart, but each work is represented by a scaled image. The question of space can be interpreted as its physical space, or as relative representation in the collection. There is a filter to include works that are currently on view and works that are not currently on view, which is an additional layer of which works get to be seen in person. Clicking on an artwork opens up a modal which is a consistent size for each work regardless of its scaled size. From the modal view you can click on a link to open up a page for the single object and see all of its details.  

Data: `NPG` scaled by `physicalDescription` —> `Dimensions`, `setName`, `object_type`
<br>
<br>
![NPG_Space](https://github.com/user-attachments/assets/3d49d4a8-690b-4ecb-9532-6b55ba63e7fe)

<br>
<br>
<br>

<h3>How can we understand geographic plant biodiversity through the Botany collection?</h3>

This bubble chart aims to answer the question of the relative biodiversity per region as represented by the Botany collection. Each bubble size reflects the number of species for that region. Clicking onto a bubble displays a tree chart for each Kingdom, Class, Order and Family represented in that region. First just the Kingdoms will be displayed, and once one is clicked then its children are also displayed. This pattern continues until reaching the leaf circles. Clicking a leaf circle opens up a list of all of the species in the chosen classification. From the list view, clicking on a specific item will show the entire object details. The goal of this visualization is to compare the number of species per region, and get familiar with the many levels of botanic classification for each species, further highlighting the plant diversity (or lake thereof) for each region.  

Data: `NMNHBOTANY` filtered by `Biogeographical Region` and then by `tax_class`, `tax_family`, `tax_kingdom` and `tax_order`
<br>
<br>
![Botany_Biodiversity](https://github.com/user-attachments/assets/9c9b5d2c-5a55-4495-bac8-cef0d1307a6b)

<br>
<br>
<br>

<h3>What was the geographic progression of species collection in the Botany collection?</h3>

What is the progression collection of species geographic region or continent by collection date? This question is visualized using a streamgraph that represents the number of specimens collected by date in each region. The data will include *all* specimens collected as a opposed to just unique plants since the goal is to get a sense of the history and development of the collection, and see if any patterns regarding expeditions emerge. Clicking on any colored portion of the streamgraph (any region/ continent) will lead to a list of all works in that continent, which can be filtered by date collected. Each object in the list can be clicked to see its full details. 

Data: `NMNHBOTANY` filtered by `name` —> `Biogeographical Region` or `geoLocation` —> `Continent` and then by `date` —> `Date Collected`
<br>
<br>
![Botany_DateCollected](https://github.com/user-attachments/assets/c9fe540e-6ca6-4d85-8846-be76110a995b)
