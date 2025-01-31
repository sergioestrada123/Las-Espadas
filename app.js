jQuery(function($) {
    function initTabs($tab) {
        // Verificar si la galería existe y realizar una acción
        if ($tab.parents(".dipl_tabs").find(".et_pb_gallery").length > 0) {
            $tab.parents(".dipl_tabs").find(".et_pb_gallery").each(function() {
                window.et_pb_gallery_init($(this));
            });
        }

        // Verificar si hay una galería de mampostería
        if ($tab.parents(".dipl_tabs").find(".dipl_masonry_gallery").length > 0) {
            $tab.parents(".dipl_tabs").find(".dipl_masonry_gallery").each(function() {
                masonryLayout($(this).find(".dipl_masonry_gallery_wrapper"), ".dipl_masonry_gallery_item", ".dipl_masonry_gallery_item", ".dipl_masonry_gallery_item_gutter", true);
            });
        }
    }

    function masonryLayout($container, itemSelector, itemClass, gutterClass, shouldLoad) {
        if ($container.length === 0 || itemSelector === "") return;
        let options = {
            itemSelector: itemSelector,
            layoutMode: "masonry",
            percentPosition: true,
            resize: true
        };

        if (itemClass && gutterClass) {
            options = { ...options, columnWidth: itemClass, gutter: gutterClass };
        }

        let masonry = $container.isotope(options);
        masonry.isotope("revealItemElements", $container.find(itemSelector));

        if (shouldLoad) {
            masonry.imagesLoaded().progress(function() {
                masonry.isotope("layout");
                masonry.isotope("reloadItems");
            });
        }
    }

    $("body").find(".dipl_tabs").each(function() {
        $(this).find(".dipl_tab_wrapper .dipl_tabs_item_title").on("click", function() {
            if ($(this).hasClass("dipl_active_tab")) return false;
            let index = parseInt($(this).index()) + 1;
            $(this).addClass("dipl_active_tab").siblings().removeClass("dipl_active_tab");
            $(this).parent().siblings(".dipl_tabs_content").find(".dipl_tabs_item:nth-child(" + index + ")").addClass("dipl_active_tab_content").siblings().removeClass("dipl_active_tab_content");
            initTabs($(this));
        });
    });
});